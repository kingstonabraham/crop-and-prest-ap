import React, { useState, useRef, useEffect } from 'react';
import { Language, CaseRecord, ChatMessage } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { caseStore } from '../services/caseStore';
import {
  Image as ImageIcon,
  Camera,
  Send,
  Plus,
  Edit2,
  Sparkles,
  RefreshCw,
  Check,
  Briefcase,
  AlertTriangle,
  X,
} from 'lucide-react';

interface ChatScreenProps {
  language: Language;
  activeCase: CaseRecord | null;
  onBack: () => void;
  onNavigateToCases: () => void;
  initialPromptText?: string;
  autoTriggerPhotoPicker?: boolean;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  language,
  activeCase,
  onBack,
  onNavigateToCases,
  initialPromptText = '',
  autoTriggerPhotoPicker = false,
}) => {
  const t = TRANSLATIONS[language];
  const [inputText, setInputText] = useState(initialPromptText);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedPhotoMime, setSelectedPhotoMime] = useState<string>('image/jpeg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(activeCase?.title || '');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeCase?.messages, isAnalyzing]);

  // Handle auto trigger photo picker if requested from Scan Crop button
  useEffect(() => {
    if (autoTriggerPhotoPicker && fileInputRef.current) {
      const timer = setTimeout(() => {
        fileInputRef.current?.click();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [autoTriggerPhotoPicker]);

  // Handle photo file selection
  const handlePhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedPhotoMime(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedPhoto(reader.result as string);
      setLastError(null);
    };
    reader.readAsDataURL(file);
    // Reset file input value so same file can be re-selected if desired
    e.target.value = '';
  };

  // Trigger file dialog
  const triggerGallery = () => {
    fileInputRef.current?.click();
  };

  // Trigger camera dialog
  const triggerCamera = () => {
    cameraInputRef.current?.click();
  };

  // Send message and call model diagnosis endpoint
  const handleSendMessage = async (customText?: string, customPhoto?: string) => {
    const textToSend = customText !== undefined ? customText : inputText;
    const photoToSend = customPhoto !== undefined ? customPhoto : selectedPhoto;

    if (!textToSend.trim() && !photoToSend) return;

    const userMessage: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: textToSend.trim() || undefined,
      photoUrl: photoToSend || undefined,
      photoMime: selectedPhotoMime,
      timestamp: Date.now(),
    };

    // 1. Immediately save user message (creates case if first message, or appends to active case)
    const currentCase = caseStore.saveMessage(userMessage);

    // Clear inputs immediately
    setInputText('');
    setSelectedPhoto(null);
    setLastError(null);
    setIsAnalyzing(true);

    try {
      // Call server-side crop-diagnose endpoint
      const response = await fetch('/api/crop-diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photoBase64: photoToSend || undefined,
          photoMime: selectedPhotoMime,
          question: textToSend,
          language: language,
          forceDemo: caseStore.getDemoMode(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const resData = await response.json();

      if (resData.success && resData.data) {
        const diag = resData.data;
        const agentMessage: ChatMessage = {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: diag.description,
          timestamp: Date.now(),
          isDemo: resData.isDemo,
          diagnosisData: {
            crop: diag.crop,
            symptom: diag.symptom,
            headline: diag.headline,
            description: diag.description,
            suggestedTitle: diag.suggestedTitle,
            nextSteps: diag.nextSteps,
            followUpPrompt: diag.followUpPrompt,
            confidence: diag.confidence,
          },
        };

        // Save agent response immediately to the exact same case
        caseStore.saveMessage(agentMessage, diag.crop, diag.symptom);

        // If there's an additional follow-up prompt, append it as a friendly bot bubble as seen in mockup #3
        if (diag.followUpPrompt) {
          const followUpBubble: ChatMessage = {
            id: `msg_agent_fu_${Date.now() + 50}`,
            sender: 'agent',
            text: diag.followUpPrompt,
            timestamp: Date.now() + 50,
          };
          caseStore.saveMessage(followUpBubble);
        }
      } else {
        throw new Error(resData.error || 'Failed to analyze crop photo.');
      }
    } catch (err: any) {
      console.warn('Diagnosis error (conversation preserved):', err);
      setLastError(t.errorRetryPrompt);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Retry failed model request without duplicating case or losing history
  const handleRetry = () => {
    if (!activeCase || activeCase.messages.length === 0) return;
    const lastUserMsg = [...activeCase.messages].reverse().find((m) => m.sender === 'user');
    if (lastUserMsg) {
      setLastError(null);
      setIsAnalyzing(true);
      fetch('/api/crop-diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photoBase64: lastUserMsg.photoUrl,
          photoMime: lastUserMsg.photoMime || 'image/jpeg',
          question: lastUserMsg.text || '',
          language: language,
          forceDemo: true, // fallback to reliable demo
        }),
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success && resData.data) {
            const diag = resData.data;
            const agentMsg: ChatMessage = {
              id: `msg_agent_retry_${Date.now()}`,
              sender: 'agent',
              text: diag.description,
              timestamp: Date.now(),
              isDemo: true,
              diagnosisData: {
                crop: diag.crop,
                symptom: diag.symptom,
                headline: diag.headline,
                description: diag.description,
                suggestedTitle: diag.suggestedTitle,
                nextSteps: diag.nextSteps,
                followUpPrompt: diag.followUpPrompt,
                confidence: diag.confidence,
              },
            };
            caseStore.saveMessage(agentMsg, diag.crop, diag.symptom);
          }
        })
        .catch(() => {
          setLastError(t.errorRetryPrompt);
        })
        .finally(() => {
          setIsAnalyzing(false);
        });
    }
  };

  // "Save to My Cases" confirms existing case and notifies user
  const handleSaveToMyCases = () => {
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      onNavigateToCases();
    }, 1200);
  };

  // Start a new chat (clears active case, starts fresh separate case)
  const handleStartNewChat = () => {
    caseStore.startNewChat();
    setInputText('');
    setSelectedPhoto(null);
    setLastError(null);
  };

  // Save renamed title
  const handleSaveRename = () => {
    if (activeCase && newTitle.trim()) {
      caseStore.renameCaseTitle(activeCase.id, newTitle.trim());
    }
    setIsRenaming(false);
  };

  const messages = activeCase?.messages || [];

  return (
    <div className="flex-1 flex flex-col max-w-md w-full mx-auto bg-[#f7f5ee] relative h-[calc(100dvh-54px)]">
      {/* Hidden file inputs for Camera and Gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoFile}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handlePhotoFile}
      />

      {/* Sub-header Bar: Case title, Rename, New chat */}
      <div className="px-4 py-2 bg-[#eae5d8] border-b border-[#ded8c7] flex items-center justify-between text-xs font-semibold text-[#0e3820]">
        <div className="flex items-center gap-1.5 truncate">
          {activeCase ? (
            isRenaming ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveRename()}
                  className="px-2 py-0.5 bg-white border border-[#165a36] rounded text-xs"
                  autoFocus
                />
                <button
                  onClick={handleSaveRename}
                  className="p-1 bg-[#0e3820] text-white rounded"
                >
                  <Check className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 truncate">
                <span className="truncate font-bold text-sm text-[#0e3820]">
                  {activeCase.title}
                </span>
                <button
                  onClick={() => {
                    setNewTitle(activeCase.title);
                    setIsRenaming(true);
                  }}
                  className="text-[#55695b] hover:text-[#0e3820]"
                  title={t.renameCase}
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )
          ) : (
            <span className="text-[#55695b] italic">New inspection (Draft)</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* New Chat Button */}
          <button
            onClick={handleStartNewChat}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#0e3820] text-white rounded-full font-bold hover:bg-[#12492a] transition-all active:scale-95 shadow-xs"
          >
            <Plus className="w-3 h-3" />
            <span>{t.newChatBtn}</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {saveToast && (
        <div className="absolute top-12 left-4 right-4 z-50 p-2.5 bg-[#0e3820] text-white text-xs font-semibold rounded-xl text-center shadow-lg transition-all flex items-center justify-center gap-2">
          <Check className="w-4 h-4 text-[#86efac]" />
          <span>{t.savedToCasesAlert}</span>
        </div>
      )}

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Initial Bot Welcome Prompt */}
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#165a36] flex items-center justify-center text-white shrink-0 shadow-xs">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 3c-5.5 0-10 4.5-10 10 0 4.8 3.5 8.8 8.1 9.8-.1-.6-.1-1.3-.1-1.9 0-4.5 3.3-8.2 7.7-8.9.2-.9.3-1.9.3-2.9 0-3.3-2.7-6-6-6zM8.5 12.5C7.1 12.5 6 13.6 6 15c0 3 2.5 5.5 5.5 5.5.3 0 .7 0 1-.1-2.4-1.8-4-4.6-4-7.9z" />
            </svg>
          </div>
          <div className="p-3 bg-white rounded-2xl rounded-tl-xs border border-[#ded8c7] shadow-xs max-w-[85%] text-sm text-[#14231b]">
            <p>{t.initialPrompt}</p>
          </div>
        </div>

        {/* Conversation Messages */}
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          if (isUser) {
            return (
              <div key={msg.id} className="flex flex-col items-end gap-1.5">
                <div className="max-w-[85%] bg-[#dcfce7] border border-[#bbf7d0] rounded-2xl rounded-tr-xs p-3 shadow-xs space-y-2">
                  {msg.photoUrl && (
                    <div className="rounded-xl overflow-hidden border border-[#86efac] max-h-56 bg-black/5">
                      <img
                        src={msg.photoUrl}
                        alt="Crop scan photo"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  {msg.text && (
                    <p className="text-sm text-[#0e3820] font-medium leading-relaxed">
                      {msg.text}
                    </p>
                  )}
                </div>
                <span className="text-[10px] text-[#788a7f] px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            );
          }

          // Agent Message
          const diag = msg.diagnosisData;

          return (
            <div key={msg.id} className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#165a36] flex items-center justify-center text-white shrink-0 shadow-xs">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 3c-5.5 0-10 4.5-10 10 0 4.8 3.5 8.8 8.1 9.8-.1-.6-.1-1.3-.1-1.9 0-4.5 3.3-8.2 7.7-8.9.2-.9.3-1.9.3-2.9 0-3.3-2.7-6-6-6zM8.5 12.5C7.1 12.5 6 13.6 6 15c0 3 2.5 5.5 5.5 5.5.3 0 .7 0 1-.1-2.4-1.8-4-4.6-4-7.9z" />
                </svg>
              </div>

              <div className="space-y-2 max-w-[88%]">
                <div className="p-3.5 bg-white rounded-2xl rounded-tl-xs border border-[#ded8c7] shadow-xs text-sm text-[#14231b] space-y-2">
                  {/* Model Demo Tag if demo response */}
                  {msg.isDemo && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fef3c7] text-[#92400e] text-[10px] font-bold tracking-tight">
                      <Sparkles className="w-3 h-3" />
                      <span>{t.demoModelBadge}</span>
                    </div>
                  )}

                  {diag?.headline && (
                    <h2 className="font-extrabold text-base text-[#0e3820] leading-snug">
                      {diag.headline}
                    </h2>
                  )}

                  <p className="leading-relaxed text-[#2c3d32]">{msg.text}</p>

                  {/* Next steps checklist if available */}
                  {diag?.nextSteps && diag.nextSteps.length > 0 && (
                    <div className="pt-2 border-t border-[#f0ede4] space-y-1.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#165a36]">
                        {t.whatToCheckNext}:
                      </p>
                      <ul className="space-y-1 text-xs text-[#38493f]">
                        {diag.nextSteps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#165a36] font-bold">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Quick Action Chips as in Mockup #3 */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={triggerGallery}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#eae5d8] hover:bg-[#ded8c7] text-[#0e3820] text-xs font-bold rounded-full border border-[#ded8c7] transition-all active:scale-95"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{t.addPhotoBtn}</span>
                  </button>

                  <button
                    onClick={handleSaveToMyCases}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#eae5d8] hover:bg-[#ded8c7] text-[#0e3820] text-xs font-bold rounded-full border border-[#ded8c7] transition-all active:scale-95"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{t.saveToCasesBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading / Analyzing Indicator */}
        {isAnalyzing && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#165a36] flex items-center justify-center text-white shrink-0 animate-pulse">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 3c-5.5 0-10 4.5-10 10 0 4.8 3.5 8.8 8.1 9.8-.1-.6-.1-1.3-.1-1.9 0-4.5 3.3-8.2 7.7-8.9.2-.9.3-1.9.3-2.9 0-3.3-2.7-6-6-6zM8.5 12.5C7.1 12.5 6 13.6 6 15c0 3 2.5 5.5 5.5 5.5.3 0 .7 0 1-.1-2.4-1.8-4-4.6-4-7.9z" />
              </svg>
            </div>
            <div className="p-3.5 bg-white rounded-2xl rounded-tl-xs border border-[#ded8c7] shadow-xs flex items-center gap-2 text-xs font-semibold text-[#165a36]">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{t.analyzingPhoto}</span>
            </div>
          </div>
        )}

        {/* Error and Retry Banner (Conversation preserved!) */}
        {lastError && (
          <div className="p-3 bg-[#fef2f2] border border-[#fecaca] rounded-2xl text-xs text-[#991b1b] space-y-2">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
              <p>{lastError}</p>
            </div>
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.retryBtn}</span>
            </button>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Selected Photo Preview before sending */}
      {selectedPhoto && (
        <div className="px-4 py-2 bg-[#eae5d8] border-t border-[#ded8c7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#165a36] relative bg-black/10">
              <img
                src={selectedPhoto}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-semibold text-[#0e3820]">
              Photo attached
            </span>
          </div>
          <button
            onClick={() => setSelectedPhoto(null)}
            className="p-1 hover:bg-[#ded8c7] rounded-full text-[#55695b]"
            title="Remove photo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Message Input Bar */}
      <div className="p-3 bg-[#f7f5ee] border-t border-[#ded8c7] safe-bottom">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-1.5 bg-white rounded-full border border-[#ded8c7] p-1.5 shadow-xs focus-within:border-[#165a36] focus-within:ring-2 focus-within:ring-[#165a36]/20 transition-all"
        >
          {/* Gallery Button */}
          <button
            type="button"
            onClick={triggerGallery}
            className="p-2 text-[#55695b] hover:text-[#0e3820] hover:bg-[#f0ede4] rounded-full transition-colors"
            title={t.galleryUpload}
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Camera Button */}
          <button
            type="button"
            onClick={triggerCamera}
            className="p-2 text-[#55695b] hover:text-[#0e3820] hover:bg-[#f0ede4] rounded-full transition-colors"
            title={t.takeCameraPhoto}
          >
            <Camera className="w-5 h-5" />
          </button>

          {/* Divider */}
          <div className="h-5 w-[1px] bg-[#ded8c7]" />

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.typeMessagePlaceholder}
            className="flex-1 px-2.5 py-1 text-sm text-[#14231b] placeholder-[#809185] bg-transparent outline-hidden font-medium"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={(!inputText.trim() && !selectedPhoto) || isAnalyzing}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0 ${
              (inputText.trim() || selectedPhoto) && !isAnalyzing
                ? 'bg-[#0e3820] hover:bg-[#12492a] text-white shadow-sm active:scale-95'
                : 'bg-[#ded8c7] text-[#809185] cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
