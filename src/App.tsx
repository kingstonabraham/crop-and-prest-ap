import React, { useState, useEffect } from 'react';
import { Language, CaseRecord } from './types';
import { caseStore } from './services/caseStore';
import { Header } from './components/Header';
import { BottomNav, TabKey } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { MyCasesScreen } from './components/MyCasesScreen';
import { LearnScreen } from './components/LearnScreen';
import { ChatScreen } from './components/ChatScreen';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(caseStore.getLanguage());
  const [currentTab, setCurrentTab] = useState<TabKey>('home');
  const [previousTab, setPreviousTab] = useState<TabKey>('home');
  const [allCases, setAllCases] = useState<CaseRecord[]>(caseStore.getAllCases());
  const [activeCase, setActiveCase] = useState<CaseRecord | null>(caseStore.getActiveCase());

  // Additional chat state triggers
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string>('');
  const [autoOpenPhotoPicker, setAutoOpenPhotoPicker] = useState<boolean>(false);

  // Subscribe to caseStore changes for real-time reactivity
  useEffect(() => {
    const unsubscribe = caseStore.subscribe(() => {
      setAllCases(caseStore.getAllCases());
      setActiveCase(caseStore.getActiveCase());
      setCurrentLanguage(caseStore.getLanguage());
    });
    return unsubscribe;
  }, []);

  // Language change handler
  const handleLanguageChange = (newLang: Language) => {
    setCurrentLanguage(newLang);
    caseStore.setLanguage(newLang);
  };

  // Navigation handlers
  const handleTabSelect = (tab: TabKey) => {
    if (tab === currentTab) return;
    setPreviousTab(currentTab);
    setCurrentTab(tab);
    setAutoOpenPhotoPicker(false);
  };

  // Home > Scan crop: opens AI Agent chat, ready to send crop photo
  const handleScanCrop = () => {
    setPreviousTab(currentTab);
    setAutoOpenPhotoPicker(true);
    setChatInitialPrompt('');
    setCurrentTab('agent');
  };

  // Home > Field inspection: opens My Cases
  const handleOpenFieldInspection = () => {
    setPreviousTab(currentTab);
    setCurrentTab('cases');
  };

  // Home > Knowledge library: opens Learn
  const handleOpenKnowledgeLibrary = () => {
    setPreviousTab(currentTab);
    setCurrentTab('learn');
  };

  // Reopen saved conversation from My Cases or Home Recent Cases
  const handleSelectCase = (caseId: string) => {
    caseStore.setActiveCaseId(caseId);
    setPreviousTab(currentTab);
    setAutoOpenPhotoPicker(false);
    setChatInitialPrompt('');
    setCurrentTab('agent');
  };

  // Start a brand new chat
  const handleNewChat = () => {
    caseStore.startNewChat();
    setPreviousTab(currentTab);
    setAutoOpenPhotoPicker(false);
    setChatInitialPrompt('');
    setCurrentTab('agent');
  };

  // Learn > "Scan a similar symptom": opens AI Agent ready to receive photo
  const handleScanSimilarSymptom = (samplePrompt: string) => {
    caseStore.startNewChat();
    setPreviousTab('learn');
    setChatInitialPrompt(samplePrompt);
    setAutoOpenPhotoPicker(true);
    setCurrentTab('agent');
  };

  // Back button inside Chat screen
  const handleChatBack = () => {
    setCurrentTab(previousTab === 'agent' ? 'home' : previousTab);
    setAutoOpenPhotoPicker(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f5ee] text-[#14231b] flex flex-col font-sans select-none sm:select-auto">
      {/* Top Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        showBack={currentTab === 'agent'}
        onBack={handleChatBack}
        title={currentTab === 'agent' ? 'CropTrace AI Agent' : undefined}
        subtitle={currentTab === 'agent' ? 'Crop disease & pest help' : undefined}
      />

      {/* Connectivity Banner */}
      <OfflineIndicator language={currentLanguage} />

      {/* Main Screen Content */}
      <main className="flex-1 w-full overflow-x-hidden flex flex-col">
        {currentTab === 'home' && (
          <HomeScreen
            language={currentLanguage}
            recentCases={caseStore.getRecentCases(3)}
            onScanCrop={handleScanCrop}
            onOpenCases={handleOpenFieldInspection}
            onOpenLearn={handleOpenKnowledgeLibrary}
            onSelectCase={handleSelectCase}
            onOpenAgentChat={() => {
              setPreviousTab('home');
              setCurrentTab('agent');
            }}
          />
        )}

        {currentTab === 'cases' && (
          <MyCasesScreen
            language={currentLanguage}
            cases={allCases}
            onSelectCase={handleSelectCase}
            onNewChat={handleNewChat}
          />
        )}

        {currentTab === 'learn' && (
          <LearnScreen
            language={currentLanguage}
            onScanSimilarSymptom={handleScanSimilarSymptom}
          />
        )}

        {currentTab === 'agent' && (
          <ChatScreen
            language={currentLanguage}
            activeCase={activeCase}
            onBack={handleChatBack}
            onNavigateToCases={() => setCurrentTab('cases')}
            initialPromptText={chatInitialPrompt}
            autoTriggerPhotoPicker={autoOpenPhotoPicker}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation - shown on Home, My Cases, and Learn tabs */}
      {currentTab !== 'agent' && (
        <BottomNav
          currentTab={currentTab}
          onTabSelect={handleTabSelect}
          language={currentLanguage}
        />
      )}
    </div>
  );
}
