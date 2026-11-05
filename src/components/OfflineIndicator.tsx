import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { WifiOff } from 'lucide-react';

interface OfflineIndicatorProps {
  language: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ language }) => {
  const isOnline = useOnlineStatus();
  const t = TRANSLATIONS[language];

  if (isOnline) return null;

  return (
    <aside
      aria-label="Offline notice"
      className="fixed top-14 left-4 right-4 z-50 flex items-center gap-2 p-2.5 bg-[#92400e] text-white rounded-2xl shadow-xl text-xs font-semibold animate-in slide-in-from-top-2"
    >
      <WifiOff className="w-4 h-4 text-[#fde68a] shrink-0" />
      <span className="flex-1">{t.offlineBanner}</span>
    </aside>
  );
};
