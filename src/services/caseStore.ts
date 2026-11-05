import { CaseRecord, ChatMessage, CaseStatus, Language } from '../types';
import { INITIAL_SEED_CASES } from '../data/seedCases';
import {
  createCaseFromFirstMessage,
  appendMessageToCase,
  updateCaseStatus,
  renameCase,
} from '../utils/case-logic';

const STORAGE_KEY_CASES = 'zenvor_croptrace_cases_v2';
const STORAGE_KEY_LANG = 'zenvor_croptrace_lang';
const STORAGE_KEY_ACTIVE_CASE = 'zenvor_croptrace_active_case_id';

type Listener = () => void;

class CaseStore {
  private cases: CaseRecord[] = [];
  private activeCaseId: string | null = null;
  private currentLanguage: Language = 'en';
  private listeners: Set<Listener> = new Set();
  private isDemoMode: boolean = false; // Will try live Colab / Gemini model endpoint first, with automatic demo fallback if offline

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedLang = localStorage.getItem(STORAGE_KEY_LANG);
      if (storedLang && ['en', 'hi', 'ta', 'te'].includes(storedLang)) {
        this.currentLanguage = storedLang as Language;
      }

      const storedCases = localStorage.getItem(STORAGE_KEY_CASES);
      if (storedCases) {
        const parsed = JSON.parse(storedCases);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.cases = parsed;
        } else {
          this.cases = [...INITIAL_SEED_CASES];
          this.saveToStorage();
        }
      } else {
        this.cases = [...INITIAL_SEED_CASES];
        this.saveToStorage();
      }

      const activeId = localStorage.getItem(STORAGE_KEY_ACTIVE_CASE);
      if (activeId && this.cases.some((c) => c.id === activeId)) {
        this.activeCaseId = activeId;
      }
    } catch (e) {
      console.warn('Failed to load from storage, using initial seed', e);
      this.cases = [...INITIAL_SEED_CASES];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_CASES, JSON.stringify(this.cases));
      if (this.activeCaseId) {
        localStorage.setItem(STORAGE_KEY_ACTIVE_CASE, this.activeCaseId);
      } else {
        localStorage.removeItem(STORAGE_KEY_ACTIVE_CASE);
      }
      localStorage.setItem(STORAGE_KEY_LANG, this.currentLanguage);
    } catch (e) {
      console.warn('Storage save failed (storage might be full or private mode)', e);
    }
    this.notify();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  // Language management
  public getLanguage(): Language {
    return this.currentLanguage;
  }

  public setLanguage(lang: Language) {
    if (this.currentLanguage !== lang) {
      this.currentLanguage = lang;
      this.saveToStorage();
    }
  }

  // Demo mode toggle
  public getDemoMode(): boolean {
    return this.isDemoMode;
  }

  public setDemoMode(val: boolean) {
    this.isDemoMode = val;
    this.notify();
  }

  // Cases access
  public getAllCases(): CaseRecord[] {
    return [...this.cases].sort((a, b) => b.updatedAt - a.updatedAt);
  }

  public getRecentCases(limit: number = 3): CaseRecord[] {
    return this.getAllCases().slice(0, limit);
  }

  public getCaseById(id: string): CaseRecord | undefined {
    return this.cases.find((c) => c.id === id);
  }

  public getActiveCase(): CaseRecord | null {
    if (!this.activeCaseId) return null;
    return this.getCaseById(this.activeCaseId) || null;
  }

  public setActiveCaseId(id: string | null) {
    this.activeCaseId = id;
    this.saveToStorage();
  }

  public startNewChat() {
    this.activeCaseId = null;
    this.saveToStorage();
  }

  /**
   * Save a message to the active case, or create a brand new case if this is the first message.
   * Returns the updated or created case.
   */
  public saveMessage(message: ChatMessage, cropHint?: string, symptomHint?: string): CaseRecord {
    let currentCase = this.getActiveCase();

    if (!currentCase) {
      // First question or photo creates a brand new case
      const newCase = createCaseFromFirstMessage(message, cropHint, symptomHint);
      this.cases.unshift(newCase);
      this.activeCaseId = newCase.id;
      this.saveToStorage();
      return newCase;
    } else {
      // Append to the existing case
      const updated = appendMessageToCase(currentCase, message);
      this.cases = this.cases.map((c) => (c.id === updated.id ? updated : c));
      this.saveToStorage();
      return updated;
    }
  }

  /**
   * Explicitly set review status (Needs review, Reviewed, Follow-up needed)
   */
  public updateStatus(caseId: string, newStatus: CaseStatus) {
    const target = this.getCaseById(caseId);
    if (!target) return;
    const updated = updateCaseStatus(target, newStatus);
    this.cases = this.cases.map((c) => (c.id === caseId ? updated : c));
    this.saveToStorage();
  }

  /**
   * Rename case title
   */
  public renameCaseTitle(caseId: string, newTitle: string) {
    const target = this.getCaseById(caseId);
    if (!target) return;
    const updated = renameCase(target, newTitle);
    this.cases = this.cases.map((c) => (c.id === caseId ? updated : c));
    this.saveToStorage();
  }

  /**
   * Delete case if farmer desires cleanup
   */
  public deleteCase(caseId: string) {
    this.cases = this.cases.filter((c) => c.id !== caseId);
    if (this.activeCaseId === caseId) {
      this.activeCaseId = null;
    }
    this.saveToStorage();
  }
}

export const caseStore = new CaseStore();
