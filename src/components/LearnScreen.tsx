import React, { useState } from 'react';
import { Language, LearnArticle, LearnCategory } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { LEARN_ARTICLES } from '../data/mockArticles';
import {
  Search,
  ChevronRight,
  Leaf,
  Bug,
  Camera,
  ArrowLeft,
  ExternalLink,
  ScanLine,
  CheckCircle,
} from 'lucide-react';
import { CropAsset } from './CropAsset';

interface LearnScreenProps {
  language: Language;
  onScanSimilarSymptom: (promptText: string) => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({
  language,
  onScanSimilarSymptom,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedCategory, setSelectedCategory] = useState<LearnCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<LearnArticle | null>(null);

  // Filter articles by category & search query
  const filteredArticles = LEARN_ARTICLES.filter((article) => {
    if (selectedCategory !== 'all' && article.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const title = (article.title[language] || article.title.en).toLowerCase();
      const summary = (article.summary[language] || article.summary.en).toLowerCase();
      return title.includes(q) || summary.includes(q);
    }
    return true;
  });

  const getBadgeIcon = (category: string) => {
    switch (category) {
      case 'diseases':
        return <Leaf className="w-3.5 h-3.5 text-[#166534]" />;
      case 'pests':
        return <Bug className="w-3.5 h-3.5 text-[#15803d]" />;
      case 'photo_tips':
      default:
        return <Camera className="w-3.5 h-3.5 text-[#047857]" />;
    }
  };

  // Article Detail View
  if (activeArticle) {
    const title = activeArticle.title[language] || activeArticle.title.en;
    const summary = activeArticle.summary[language] || activeArticle.summary.en;
    const visibleSigns = activeArticle.visibleSigns[language] || activeArticle.visibleSigns.en;
    const whatToCheck = activeArticle.whatToCheckNext[language] || activeArticle.whatToCheckNext.en;
    const photoTips = activeArticle.photoTips[language] || activeArticle.photoTips.en;
    const catLabel = activeArticle.categoryLabel[language] || activeArticle.categoryLabel.en;

    return (
      <div className="px-4 py-4 max-w-md mx-auto space-y-4 pb-28">
        {/* Back navigation */}
        <button
          onClick={() => setActiveArticle(null)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0e3820] hover:text-[#165a36] py-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backBtn}</span>
        </button>

        {/* Thumbnail Hero */}
        <div className="rounded-2xl overflow-hidden border border-[#ded8c7] shadow-sm bg-black/5 aspect-video relative">
          {activeArticle.cropPreset ? (
            <CropAsset
              preset={activeArticle.cropPreset}
              alt={title}
              className="w-full h-full"
            />
          ) : (
            <img
              src={activeArticle.thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-2.5 left-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0e3820] rounded-full text-xs font-bold shadow-xs">
              {getBadgeIcon(activeArticle.category)}
              <span>{catLabel}</span>
            </span>
          </div>
        </div>

        {/* Title & Summary */}
        <div>
          <h1 className="text-2xl font-extrabold text-[#0e3820] tracking-tight leading-snug">
            {title}
          </h1>
          <p className="text-[#38493f] text-sm leading-relaxed mt-2 font-medium">
            {summary}
          </p>
        </div>

        {/* "Scan a similar symptom" primary button */}
        <button
          onClick={() => onScanSimilarSymptom(activeArticle.sampleSymptomPrompt)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#0e3820] hover:bg-[#12492a] text-white font-bold rounded-2xl shadow-sm transition-all active:scale-[0.98]"
        >
          <ScanLine className="w-5 h-5 text-white" />
          <span className="text-sm">{t.scanSimilarBtn}</span>
        </button>

        {/* Visible Signs Section */}
        <div className="p-4 bg-white rounded-2xl border border-[#e2ddd0] shadow-xs space-y-2">
          <h2 className="text-sm font-bold text-[#0e3820] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#165a36]" />
            {t.visibleSigns}
          </h2>
          <ul className="space-y-2 text-xs text-[#38493f] leading-relaxed">
            {visibleSigns.map((sign, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#165a36] shrink-0 mt-0.5" />
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What to check next Section */}
        <div className="p-4 bg-white rounded-2xl border border-[#e2ddd0] shadow-xs space-y-2">
          <h2 className="text-sm font-bold text-[#0e3820] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0e3820]" />
            {t.whatToCheckNext}
          </h2>
          <ul className="space-y-2 text-xs text-[#38493f] leading-relaxed">
            {whatToCheck.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-[#0e3820] text-xs">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Photo Tips Section */}
        <div className="p-4 bg-[#f0f8f3] rounded-2xl border border-[#cbe4d3] shadow-xs space-y-2">
          <h2 className="text-sm font-bold text-[#165a36] flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-[#165a36]" />
            {t.photoTipsHeading}
          </h2>
          <ul className="space-y-1.5 text-xs text-[#2c3d32] leading-relaxed">
            {photoTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#165a36] font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reference Link */}
        <div className="p-3 bg-white/70 rounded-2xl border border-[#ded8c7] flex items-center justify-between text-xs">
          <div>
            <span className="text-[#788a7f] font-medium block text-[10px] uppercase">
              {t.referenceLinkHeading}
            </span>
            <span className="font-bold text-[#0e3820] line-clamp-1">
              {activeArticle.referenceLink.title}
            </span>
          </div>
          <a
            href={activeArticle.referenceLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#165a36] hover:bg-[#e8f2eb] rounded-xl transition-colors shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // Articles Catalog List View
  return (
    <div className="px-4 py-4 max-w-md mx-auto space-y-4 pb-24">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#0e3820] tracking-tight flex items-center gap-2">
          <span>{t.learnTitle}</span>
          <span className="text-2xl">🌿</span>
        </h1>
        <p className="text-[#55695b] text-base font-medium mt-1">
          {t.learnSubtitle}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#55695b]">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchLearnPlaceholder}
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

      {/* Filter Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
        {/* All */}
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
            selectedCategory === 'all'
              ? 'bg-[#0e3820] text-white shadow-xs'
              : 'bg-[#ede8da] text-[#2c3d32] hover:bg-[#e4decb]'
          }`}
        >
          {t.catAll}
        </button>

        {/* Diseases */}
        <button
          onClick={() => setSelectedCategory('diseases')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
            selectedCategory === 'diseases'
              ? 'bg-[#0e3820] text-white shadow-xs'
              : 'bg-[#ede8da] text-[#2c3d32] hover:bg-[#e4decb]'
          }`}
        >
          {t.catDiseases}
        </button>

        {/* Pests */}
        <button
          onClick={() => setSelectedCategory('pests')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
            selectedCategory === 'pests'
              ? 'bg-[#0e3820] text-white shadow-xs'
              : 'bg-[#ede8da] text-[#2c3d32] hover:bg-[#e4decb]'
          }`}
        >
          {t.catPests}
        </button>

        {/* Photo tips */}
        <button
          onClick={() => setSelectedCategory('photo_tips')}
          className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
            selectedCategory === 'photo_tips'
              ? 'bg-[#0e3820] text-white shadow-xs'
              : 'bg-[#ede8da] text-[#2c3d32] hover:bg-[#e4decb]'
          }`}
        >
          {t.catPhotoTips}
        </button>
      </div>

      {/* Articles List matching Mockup 4 */}
      <div className="space-y-3 pt-1">
        {filteredArticles.length === 0 ? (
          <div className="p-8 text-center bg-white/70 rounded-2xl border border-[#ded8c7] text-sm text-[#55695b]">
            No articles found. Try a different search term or category.
          </div>
        ) : (
          filteredArticles.map((article) => {
            const articleTitle = article.title[language] || article.title.en;
            const catLabel = article.categoryLabel[language] || article.categoryLabel.en;

            return (
              <div
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="flex items-center justify-between p-3 bg-white/95 hover:bg-white rounded-2xl border border-[#e2ddd0] shadow-xs transition-all cursor-pointer group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#e8e4d8] shrink-0 border border-[#d8d2c2] relative">
                    {article.cropPreset ? (
                      <CropAsset
                        preset={article.cropPreset}
                        alt={articleTitle}
                        className="w-full h-full"
                      />
                    ) : (
                      <img
                        src={article.thumbnailUrl}
                        alt={articleTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                  </div>

                  {/* Title & Category Badge */}
                  <div className="min-w-0">
                    <h2 className="font-bold text-sm sm:text-base text-[#0e3820] truncate">
                      {articleTitle}
                    </h2>
                    <div className="mt-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#eaf5ee] text-[#166534] rounded-full text-xs font-semibold">
                        {getBadgeIcon(article.category)}
                        <span>{catLabel}</span>
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
    </div>
  );
};
