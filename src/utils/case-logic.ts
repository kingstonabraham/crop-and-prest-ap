import { CaseRecord, ChatMessage, CaseStatus } from '../types';

/**
 * Generate an automatic case title:
 * When crop and symptom are available -> "Crop · Symptom" (e.g. "Tomato · Leaf spots")
 * Otherwise fallback to first question snippet or "Crop scan · [date]"
 */
export function generateCaseTitle(
  crop?: string,
  symptom?: string,
  fallbackQuestion?: string,
  timestamp: number = Date.now()
): string {
  if (crop && symptom) {
    const cleanCrop = crop.trim();
    const cleanSymptom = symptom.trim();
    if (cleanCrop.length > 0 && cleanSymptom.length > 0) {
      return `${cleanCrop} · ${cleanSymptom}`;
    }
  }

  if (fallbackQuestion && fallbackQuestion.trim().length > 0) {
    const q = fallbackQuestion.trim();
    if (q.length <= 32) return q;
    return `${q.substring(0, 30)}...`;
  }

  const d = new Date(timestamp);
  const formattedDate = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return `Crop scan · ${formattedDate}`;
}

/**
 * Filter cases by status and search text
 */
export function filterCases(
  cases: CaseRecord[],
  statusFilter: 'all' | CaseStatus,
  searchQuery: string = ''
): CaseRecord[] {
  let list = cases;

  if (statusFilter !== 'all') {
    list = list.filter((c) => c.status === statusFilter);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.crop && c.crop.toLowerCase().includes(q)) ||
        (c.symptom && c.symptom.toLowerCase().includes(q)) ||
        c.messages.some((m) => m.text && m.text.toLowerCase().includes(q))
    );
  }

  // Sort newest activity first
  return [...list].sort((a, b) => b.updatedAt - a.updatedAt);
}

/**
 * Creates a new case when the first message is sent
 */
export function createCaseFromFirstMessage(
  firstMessage: ChatMessage,
  crop?: string,
  symptom?: string
): CaseRecord {
  const now = Date.now();
  const title = generateCaseTitle(crop, symptom, firstMessage.text, now);

  return {
    id: `case_${now}_${Math.random().toString(36).substring(2, 7)}`,
    title,
    crop,
    symptom,
    status: 'needs_review', // New cases start as Needs review
    createdAt: now,
    updatedAt: now,
    thumbnailUrl: firstMessage.photoUrl,
    messages: [firstMessage],
  };
}

/**
 * Adds a message to an existing case and updates its title if new diagnostic info arrives
 */
export function appendMessageToCase(
  existingCase: CaseRecord,
  newMessage: ChatMessage
): CaseRecord {
  const updatedMessages = [...existingCase.messages, newMessage];
  const now = Date.now();

  let newCrop = existingCase.crop;
  let newSymptom = existingCase.symptom;
  let newTitle = existingCase.title;
  let newThumb = existingCase.thumbnailUrl || newMessage.photoUrl;

  if (newMessage.diagnosisData) {
    if (newMessage.diagnosisData.crop) newCrop = newMessage.diagnosisData.crop;
    if (newMessage.diagnosisData.symptom) newSymptom = newMessage.diagnosisData.symptom;
    // If case has default or fallback title, update to Crop · Symptom
    if (
      (!existingCase.crop || !existingCase.symptom) &&
      newCrop &&
      newSymptom
    ) {
      newTitle = generateCaseTitle(newCrop, newSymptom, undefined, existingCase.createdAt);
    }
  }

  return {
    ...existingCase,
    crop: newCrop,
    symptom: newSymptom,
    title: newTitle,
    thumbnailUrl: newThumb,
    messages: updatedMessages,
    updatedAt: now,
  };
}

/**
 * Updates a case's review status explicitly (leaving chat does not change it)
 */
export function updateCaseStatus(
  existingCase: CaseRecord,
  newStatus: CaseStatus
): CaseRecord {
  return {
    ...existingCase,
    status: newStatus,
    updatedAt: Date.now(),
  };
}

/**
 * Rename case title explicitly
 */
export function renameCase(
  existingCase: CaseRecord,
  newTitle: string
): CaseRecord {
  const clean = newTitle.trim();
  if (!clean) return existingCase;
  return {
    ...existingCase,
    title: clean,
    updatedAt: Date.now(),
  };
}
