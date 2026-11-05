import React, { useState } from 'react';
import { Language, CaseRecord, CaseStatus } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { filterCases } from '../utils/case-logic';
import { caseStore } from '../services/caseStore';
import { Search, ChevronRight, Edit2, CheckCircle2, AlertCircle, Clock, Trash2, Plus } from 'lucide-react';
import { CropAsset } from './CropAsset';

interface MyCasesScreenProps {
  language: Language;
  cases: CaseRecord[];
  onSelectCase: (caseId: string) => void;
  onNewChat: () => void;
}

export const MyCasesScreen: React.FC<MyCasesScreenProps> = ({
  language,
  cases,
  onSelectCase,
  onNewChat,
}) => {
  const t = TRANSLATIONS[language];
  const [activeFilter, setActiveFilter] = useState<'all' | CaseStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const displayedCases = filterCases(cases, activeFilter, searchQuery);

  const handleStartRename = (e: React.MouseEvent, c: CaseRecord) => {
    e.stopPropagation();
    setEditingCaseId(c.id);
    setEditingTitle(c.title);
  };

  const handleSaveRename = (caseId: string) => {
    if (editingTitle.trim()) {
      caseStore.renameCaseTitle(caseId, editingTitle.trim());
    }
    setEditingCaseId(null);
  };

  const handleChangeStatus = (e: React.MouseEvent, caseId: string, newStatus: CaseStatus) => {
    e.stopPropagation();
    caseStore.updateStatus(caseId, newStatus);
  };

  return (
    <div className="px-4 py-4 max-w-md mx-auto space-y-4 pb-24">
      {/* Title & Subtitle */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0e3820] tracking-tight">
            {t.myCasesTitle}
          </h1>
          <p className="text-[#55695b] text-base font-medium mt-1">
            {t.myCasesSub}
          </p>
        </div>
        <button
          onClick={onNewChat}
          className="p-2 bg-[#0e3820] text-white rounded-full hover:bg-[#12492a] transition-all shadow-sm active:scale-95 shrink-0"
          title={t.newChatBtn}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#55695b]">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchCasesPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 bg-[#ede8da] hover:bg-[#eae4d4] focus:bg-white text-[#14231b] placeholder-[#728578] rounded-2xl border border-[#ded8c7] focus:border-[#165a36] focus:ring-2 focus:ring-[#165a36]/20 text-sm transition-all outline-hidden font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-[#728578] hover:text-[#0e3820]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
        {/* All */}
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
            activeFilter === 'all'
              ? 'bg-[#0e3820] text-white shadow-xs'
              : 'bg-[#ede8da] text-[#2c3d32] hover:bg-[#e4decb]'
          }`}
        >
          {t.filterAll}
        </button>

        {/* Needs review */}
        <button
          onClick={() => setActiveFilter('needs_review')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
            activeFilter === 'needs_review'
              ? 'bg-[#0e3820] text-white shadow-xs'
              : 'bg-[#ede8da] text-[#2c3d32] hover:bg-[#e4decb]'
          }`}
        >
          {t.filterNeedsReview}
        </button>

        {/* Reviewed */}
        <button
          onClick={() => setActiveFilter('reviewed')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
            activeFilter === 'reviewed'
              ? 'bg-[#0e3820] text-white shadow-xs'
              : 'bg-[#ede8da] text-[#2c3d32] hover:bg-[#e4decb]'
          }`}
        >
          {t.filterReviewed}
        </button>

        {/* Follow-up needed */}
        <button
          onClick={() => setActiveFilter('follow_up_needed')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
            activeFilter === 'follow_up_needed'
              ? 'bg-[#0e3820] text-white shadow-xs'
              : 'bg-[#ede8da] text-[#2c3d32] hover:bg-[#e4decb]'
          }`}
        >
          {t.filterFollowUp}
        </button>
      </div>

      {/* Cases List */}
      <div className="space-y-3 pt-1">
        {displayedCases.length === 0 ? (
          <div className="p-8 text-center bg-white/70 rounded-2xl border border-[#ded8c7] space-y-3">
            <AlertCircle className="w-8 h-8 text-[#55695b] mx-auto opacity-60" />
            <p className="text-sm font-medium text-[#55695b]">{t.noCasesFound}</p>
            <button
              onClick={onNewChat}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0e3820] text-white text-xs font-bold rounded-xl hover:bg-[#12492a] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{t.newChatBtn}</span>
            </button>
          </div>
        ) : (
          displayedCases.map((c) => {
            const isNeedsReview = c.status === 'needs_review';
            const isReviewed = c.status === 'reviewed';
            const isFollowUp = c.status === 'follow_up_needed';

            return (
              <div
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className="p-3 bg-white/95 hover:bg-white rounded-2xl border border-[#e2ddd0] shadow-xs transition-all cursor-pointer group active:scale-[0.99] space-y-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#e8e4d8] shrink-0 border border-[#d8d2c2] relative">
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
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#55695b] font-medium">
                          No Photo
                        </div>
                      )}
                    </div>

                    {/* Title & Badge */}
                    <div className="min-w-0">
                      {editingCaseId === c.id ? (
                        <div
                          className="flex items-center gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveRename(c.id);
                              if (e.key === 'Escape') setEditingCaseId(null);
                            }}
                            className="px-2 py-1 text-sm font-bold bg-[#ede8da] rounded-lg border border-[#165a36] text-[#0e3820] w-full"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveRename(c.id)}
                            className="px-2 py-1 text-xs bg-[#0e3820] text-white rounded-md font-bold"
                          >
                            {t.save}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 group/title">
                          <h2 className="font-bold text-sm sm:text-base text-[#0e3820] truncate">
                            {c.title}
                          </h2>
                          <button
                            onClick={(e) => handleStartRename(e, c)}
                            className="opacity-0 group-hover/title:opacity-100 text-[#55695b] hover:text-[#0e3820] p-1 transition-opacity"
                            title={t.renameCase}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <div className="mt-1 flex items-center gap-2">
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

                        <span className="text-[11px] text-[#788a7f]">
                          {new Date(c.updatedAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-[#85968c] group-hover:text-[#0e3820] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </div>

                {/* Explicit Review Status Quick Actions for the farmer */}
                <div
                  className="pt-2 border-t border-[#f0ede4] flex items-center justify-between text-[11px] text-[#55695b]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="font-medium">Set status:</span>
                  <div className="flex items-center gap-1.5">
                    {!isReviewed && (
                      <button
                        onClick={(e) => handleChangeStatus(e, c.id, 'reviewed')}
                        className="px-2 py-0.5 rounded-md bg-[#eaf7ee] hover:bg-[#dcfce7] text-[#166534] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{t.filterReviewed}</span>
                      </button>
                    )}

                    {!isFollowUp && (
                      <button
                        onClick={(e) => handleChangeStatus(e, c.id, 'follow_up_needed')}
                        className="px-2 py-0.5 rounded-md bg-[#fff7ed] hover:bg-[#ffedd5] text-[#c2410c] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Clock className="w-3 h-3" />
                        <span>{t.filterFollowUp}</span>
                      </button>
                    )}

                    {!isNeedsReview && (
                      <button
                        onClick={(e) => handleChangeStatus(e, c.id, 'needs_review')}
                        className="px-2 py-0.5 rounded-md bg-[#fefce8] hover:bg-[#fef3c7] text-[#92400e] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <AlertCircle className="w-3 h-3" />
                        <span>{t.filterNeedsReview}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
