import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { Download, Share, PlusSquare, X, Smartphone, CheckCircle } from 'lucide-react';

interface PWAInstallButtonProps {
  language: Language;
  variant?: 'header' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  language,
  variant = 'header',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const t = TRANSLATIONS[language];

  // If already running as an installed standalone PWA, hide install prompts
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // General instructions modal if browser doesn't dispatch beforeinstallprompt yet
      setShowIOSModal(true);
    }
  };

  // Header Pill Variant
  if (variant === 'header') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#165a36]/15 hover:bg-[#165a36]/25 text-[#0e3820] text-xs font-bold rounded-full border border-[#165a36]/30 transition-all active:scale-95 shadow-2xs"
          title={t.installAppBtn}
        >
          <Download className="w-3.5 h-3.5 text-[#165a36]" />
          <span className="hidden sm:inline">{t.installAppBtn}</span>
        </button>

        {showIOSModal && (
          <IOSInstallModal
            language={language}
            onClose={() => setShowIOSModal(false)}
          />
        )}
      </>
    );
  }

  // Home Screen Banner Variant
  if (isBannerDismissed) return null;

  return (
    <>
      <div className="relative overflow-hidden p-3.5 bg-gradient-to-r from-[#eaf5ee] via-[#f0f8f3] to-[#e6f4ea] rounded-2xl border border-[#cbe4d3] shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#0e3820] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Smartphone className="w-5 h-5 text-[#86efac]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-extrabold text-[#0e3820] truncate">
              {t.installAppBtn}
            </h2>
            <p className="text-[11px] text-[#55695b] font-medium line-clamp-1">
              {t.installAppSub}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 bg-[#0e3820] hover:bg-[#12492a] text-white text-xs font-bold rounded-xl transition-all shadow-xs active:scale-95 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
          <button
            onClick={() => setIsBannerDismissed(true)}
            className="p-1 text-[#788a7f] hover:text-[#0e3820] rounded-full transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showIOSModal && (
        <IOSInstallModal
          language={language}
          onClose={() => setShowIOSModal(false)}
        />
      )}
    </>
  );
};

interface IOSInstallModalProps {
  language: Language;
  onClose: () => void;
}

const IOSInstallModal: React.FC<IOSInstallModalProps> = ({ language, onClose }) => {
  const t = TRANSLATIONS[language];

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#f7f5ee] rounded-3xl p-5 shadow-2xl border border-[#ded8c7] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#ded8c7]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0e3820] flex items-center justify-center text-white">
              <Smartphone className="w-4 h-4 text-[#86efac]" />
            </div>
            <h3 className="font-extrabold text-sm text-[#0e3820]">
              {t.iosInstallTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#ded8c7] rounded-full text-[#55695b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-3 text-xs text-[#2c3d32] font-medium leading-relaxed">
          <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-[#e2ddd0] shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-[#eaf5ee] text-[#166534] flex items-center justify-center shrink-0">
              <Share className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-[#0e3820]">Step 1</p>
              <p>{t.iosStep1}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-[#e2ddd0] shadow-xs">
            <div className="w-7 h-7 rounded-lg bg-[#eaf5ee] text-[#166534] flex items-center justify-center shrink-0">
              <PlusSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-[#0e3820]">Step 2</p>
              <p>{t.iosStep2}</p>
            </div>
          </div>

          <div className="p-3 bg-[#f0f8f3] rounded-2xl border border-[#cbe4d3] flex items-center gap-2 text-[#166534]">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <p className="text-[11px] font-semibold">
              Launches in standalone fullscreen with offline field support!
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#0e3820] hover:bg-[#12492a] text-white font-bold rounded-xl text-xs transition-all shadow-xs"
        >
          {t.closeBtn}
        </button>
      </div>
    </div>,
    document.body
  );
};
