export type Language = 'en' | 'hi' | 'ta' | 'te';

export type CaseStatus = 'needs_review' | 'reviewed' | 'follow_up_needed';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text?: string;
  photoUrl?: string;
  photoMime?: string;
  timestamp: number;
  isDemo?: boolean;
  isError?: boolean;
  diagnosisData?: {
    crop?: string;
    symptom?: string;
    headline?: string;
    description?: string;
    suggestedTitle?: string;
    nextSteps?: string[];
    followUpPrompt?: string;
    confidence?: 'high' | 'medium' | 'low';
  };
}

export interface CaseRecord {
  id: string;
  title: string;
  crop?: string;
  symptom?: string;
  status: CaseStatus;
  createdAt: number;
  updatedAt: number;
  thumbnailUrl?: string;
  cropPreset?: 'leafSpots' | 'leafMiner' | 'curledLeaves' | 'heroTomatoes' | 'phonePhotoTip';
  messages: ChatMessage[];
  notes?: string;
}

export type LearnCategory = 'all' | 'diseases' | 'pests' | 'photo_tips';

export interface LearnArticle {
  id: string;
  title: Record<Language, string>;
  category: 'diseases' | 'pests' | 'photo_tips';
  categoryLabel: Record<Language, string>;
  badgeIcon: string;
  thumbnailUrl: string;
  cropPreset?: 'leafSpots' | 'leafMiner' | 'curledLeaves' | 'heroTomatoes' | 'phonePhotoTip';
  summary: Record<Language, string>;
  visibleSigns: Record<Language, string[]>;
  whatToCheckNext: Record<Language, string[]>;
  photoTips: Record<Language, string[]>;
  referenceLink: {
    title: string;
    url: string;
  };
  sampleSymptomPrompt: string;
}
