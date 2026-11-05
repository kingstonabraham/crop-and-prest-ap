import React from 'react';
import { Language, CaseRecord } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { Camera, BookOpen, ChevronRight, MessageSquareText, ShieldAlert } from 'lucide-react';
import { CropAsset } from './CropAsset';
import { PWAInstallButton } from './PWAInstallButton';

interface HomeScreenProps {
  language: Language;
  recentCases: CaseRecord[];
  onScanCrop: () => void;
  onOpenCases: () => void;
  onOpenLearn: () => void;
  onSelectCase: (caseId: string) => void;
  onOpenAgentChat: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  recentCases,
  onScanCrop,
  onOpenCases,
  onOpenLearn,
  onSelectCase,
  onOpenAgentChat,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="px-4 py-4 max-w-md mx-auto space-y-5 pb-24">
      {/* Hero Heading */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#0e3820] tracking-tight leading-tight">
          {t.checkYourCrop}
        </h1>
        <p className="text-[#55695b] text-base font-medium mt-1">
          {t.identifySub}
        </p>
      </div>

      {/* Hero Tomato Vine Card */}
      <div
        onClick={onScanCrop}
        className="relative rounded-3xl overflow-hidden shadow-xs border border-[#ded8c7] bg-[#f0f4ea] h-[195px] flex flex-col justify-end p-4 cursor-pointer group select-none active:scale-[0.99] transition-transform"
      >
        {/* Crisp tomato vines background */}
        <div className="absolute inset-0 pointer-events-none">
          <CropAsset
            preset="heroTomatoes"
            alt="Healthy tomatoes on lush vine with water drops"
            className="w-full h-full"
          />
        </div>

        {/* Accessible Transparent Action Button Overlay over pristine graphic */}
        <div className="absolute left-[24px] bottom-[16px] z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onScanCrop();
            }}
            aria-label={t.scanCropBtn}
            className="w-[150px] h-[52px] opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Two Action Cards Grid: Field inspection & Knowledge library */}
      <div className="grid grid-cols-2 gap-3">
        {/* Field inspection */}
        <button
          onClick={onOpenCases}
          className="flex items-center justify-between p-3.5 bg-[#eae5d8] hover:bg-[#e2ddd0] rounded-2xl border border-[#ded8c7] transition-all text-left group active:scale-[0.98]"
        >
          <div className="flex items-center gap-2.5">
            {/* Custom Field Furrows + Pin Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#0e3820]/10 flex items-center justify-center text-[#0e3820] shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                {/* Location pin head */}
                <path d="M7 2a3 3 0 00-3 3c0 2.2 3 5 3 5s3-2.8 3-5a3 3 0 00-3-3zm0 4.2a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" />
                {/* Furrows */}
                <path d="M12 7c-2 0-3.5.7-4.5 1.5l1.4 1.4c.7-.6 1.8-1 3.1-1 3 0 5.5 1.8 7 4.5l1.7-1C19 9 15.8 7 12 7z" />
                <path d="M10 12c-1.5 0-2.8.5-3.8 1.2l1.3 1.5c.7-.5 1.6-.8 2.5-.8 3.5 0 6.6 2.3 8 5.7l1.9-.7C18.2 14.8 14.3 12 10 12z" />
                <path d="M3 18.5c2.5 0 4.8.8 6.5 2.1l1.2-1.6C8.8 17.5 6 16.5 3 16.5v2z" />
              </svg>
            </div>
            <span className="font-bold text-sm text-[#0e3820] leading-snug">
              {t.fieldInspection}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#0e3820]/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>

        {/* Knowledge library */}
        <button
          onClick={onOpenLearn}
          className="flex items-center justify-between p-3.5 bg-[#eae5d8] hover:bg-[#e2ddd0] rounded-2xl border border-[#ded8c7] transition-all text-left group active:scale-[0.98]"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0e3820]/10 flex items-center justify-center text-[#0e3820] shrink-0">
              <BookOpen className="w-5 h-5" strokeWidth={2.4} />
            </div>
            <span className="font-bold text-sm text-[#0e3820] leading-snug">
              {t.knowledgeLibrary}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#0e3820]/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>
      </div>

      {/* In-App PWA Install Banner */}
      <PWAInstallButton language={language} variant="banner" />

      {/* Recent cases Section */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#0e3820] tracking-tight">
            {t.recentCases}
          </h2>
          <button
            onClick={onOpenCases}
            className="text-xs font-semibold text-[#165a36] hover:underline flex items-center gap-0.5"
          >
            <span>{t.filterAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentCases.length === 0 ? (
          <div className="p-4 bg-white/70 rounded-2xl border border-[#ded8c7] text-center text-sm text-[#687a6f]">
            {t.noCasesFound}
          </div>
        ) : (
          recentCases.map((c) => {
            const isNeedsReview = c.status === 'needs_review';
            const isReviewed = c.status === 'reviewed';

            return (
              <div
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className="flex items-center justify-between p-3 bg-white/90 hover:bg-white rounded-2xl border border-[#e2ddd0] shadow-xs transition-all cursor-pointer group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Photo thumbnail using CropAsset or photoUrl */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#e8e4d8] shrink-0 border border-[#d8d2c2] flex items-center justify-center relative">
                    {c.cropPreset ? (
                      <CropAsset
                        preset={c.cropPreset}
                        alt={c.title}
                        className="w-full h-full"
                      />
                    ) : c.thumbnailUrl ? (
                      <img
                        src={c.thumbnailUrl}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <ShieldAlert className="w-6 h-6 text-[#165a36]/50" />
                    )}
                  </div>

                  {/* Title and Status Badge */}
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-[#0e3820] truncate">
                      {c.title}
                    </h3>
                    <div className="mt-1">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                          isNeedsReview
                            ? 'bg-[#fef3c7] text-[#92400e]'
                            : isReviewed
                            ? 'bg-[#dcfce7] text-[#166534]'
                            : 'bg-[#ffedd5] text-[#c2410c]'
                        }`}
                      >
                        {isNeedsReview
                          ? t.statusNeedsReview
                          : isReviewed
                          ? t.statusReviewed
                          : t.statusFollowUp}
                      </span>
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-[#85968c] group-hover:text-[#0e3820] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Chat Prompt Banner */}
      <button
        onClick={onOpenAgentChat}
        className="w-full flex items-center justify-center gap-2 p-3 bg-[#e8f2eb] hover:bg-[#deede2] text-[#0e3820] rounded-full border border-[#cbe4d3] font-medium text-xs sm:text-sm transition-all shadow-xs active:scale-[0.98]"
      >
        <MessageSquareText className="w-4 h-4 text-[#165a36]" />
        <span>{t.chatBannerPrompt}</span>
      </button>
    </div>
  );
};
