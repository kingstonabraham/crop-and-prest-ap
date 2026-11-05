import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { Home, ClipboardList, BookOpen, MessageSquare } from 'lucide-react';

export type TabKey = 'home' | 'cases' | 'learn' | 'agent';

interface BottomNavProps {
  currentTab: TabKey;
  onTabSelect: (tab: TabKey) => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabSelect,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#f7f5ee]/95 backdrop-blur-md border-t border-[#ded8c7] py-2 px-3 safe-bottom"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-1">
        {/* Home */}
        <button
          onClick={() => onTabSelect('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors relative ${
            currentTab === 'home' ? 'text-[#0e3820] font-bold' : 'text-[#687a6f] hover:text-[#0e3820]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" strokeWidth={currentTab === 'home' ? 2.6 : 2} />
          <span className="text-[11px] tracking-tight">{t.navHome}</span>
          {currentTab === 'home' && (
            <span className="absolute bottom-[-6px] w-6 h-[3px] bg-[#0e3820] rounded-full" />
          )}
        </button>

        {/* My Cases */}
        <button
          onClick={() => onTabSelect('cases')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors relative ${
            currentTab === 'cases' ? 'text-[#0e3820] font-bold' : 'text-[#687a6f] hover:text-[#0e3820]'
          }`}
        >
          <ClipboardList className="w-5 h-5 mb-0.5" strokeWidth={currentTab === 'cases' ? 2.6 : 2} />
          <span className="text-[11px] tracking-tight">{t.navCases}</span>
          {currentTab === 'cases' && (
            <span className="absolute bottom-[-6px] w-6 h-[3px] bg-[#0e3820] rounded-full" />
          )}
        </button>

        {/* Learn */}
        <button
          onClick={() => onTabSelect('learn')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors relative ${
            currentTab === 'learn' ? 'text-[#0e3820] font-bold' : 'text-[#687a6f] hover:text-[#0e3820]'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" strokeWidth={currentTab === 'learn' ? 2.6 : 2} />
          <span className="text-[11px] tracking-tight">{t.navLearn}</span>
          {currentTab === 'learn' && (
            <span className="absolute bottom-[-6px] w-6 h-[3px] bg-[#0e3820] rounded-full" />
          )}
        </button>

        {/* AI Agent Capsule Button */}
        <div className="flex-1 flex justify-center pl-1">
          <button
            onClick={() => onTabSelect('agent')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-bold text-xs shadow-sm transition-all duration-150 active:scale-95 ${
              currentTab === 'agent'
                ? 'bg-[#092615] text-white ring-2 ring-[#0e3820]/30 shadow-md'
                : 'bg-[#0e3820] text-white hover:bg-[#124b2b]'
            }`}
          >
            <MessageSquare className="w-4 h-4 fill-white/20" strokeWidth={2.4} />
            <span className="tracking-tight whitespace-nowrap">{t.navAgent}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
