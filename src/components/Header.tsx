import React from 'react';
import { Language } from '../types';
import { LANGUAGE_OPTIONS } from '../utils/translations';
import { caseStore } from '../services/caseStore';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  showBack,
  onBack,
  title,
  subtitle,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#f7f5ee]/95 backdrop-blur-md px-4 pt-3 pb-2 border-b border-[#e5e0d3]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={onBack}
              aria-label="Go back"
              className="p-1.5 -ml-1 text-[#0f3d23] hover:bg-[#e6e2d3] rounded-full transition-colors active:scale-95"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          <div className="flex items-center gap-2">
            {/* Custom Green Leaf Logo */}
            <div className="w-8 h-8 rounded-full bg-[#165a36] flex items-center justify-center text-white shadow-sm shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 3c-5.5 0-10 4.5-10 10 0 4.8 3.5 8.8 8.1 9.8-.1-.6-.1-1.3-.1-1.9 0-4.5 3.3-8.2 7.7-8.9.2-.9.3-1.9.3-2.9 0-3.3-2.7-6-6-6zM8.5 12.5C7.1 12.5 6 13.6 6 15c0 3 2.5 5.5 5.5 5.5.3 0 .7 0 1-.1-2.4-1.8-4-4.6-4-7.9z" />
              </svg>
            </div>

            {title ? (
              <div className="leading-tight">
                <h1 className="font-bold text-sm sm:text-base text-[#0e3820] tracking-tight">{title}</h1>
                {subtitle && <p className="text-[11px] text-[#55695b]">{subtitle}</p>}
              </div>
            ) : (
              <div className="leading-none">
                <span className="block text-[10px] uppercase font-semibold text-[#55695b] tracking-wider">
                  Zenvor
                </span>
                <span className="block text-base font-extrabold text-[#0e3820] tracking-tight">
                  CropTrace
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          <PWAInstallButton language={currentLanguage} variant="header" />

          {/* Global Language Switcher Pills */}
          <div className="flex items-center bg-[#ede8da] p-0.5 rounded-full border border-[#ded8c7] shrink-0">
            {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = currentLanguage === opt.code;
            return (
              <button
                key={opt.code}
                onClick={() => {
                  caseStore.setLanguage(opt.code);
                  onLanguageChange(opt.code);
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#0e3820] text-white shadow-sm'
                    : 'text-[#38493f] hover:text-[#0e3820]'
                }`}
                aria-pressed={isSelected}
              >
                {opt.label}
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </header>
  );
};
