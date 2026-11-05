import { CaseRecord } from '../types';

export interface ExtendedCaseRecord extends CaseRecord {
  cropPreset?: 'leafSpots' | 'leafMiner' | 'curledLeaves' | 'heroTomatoes' | 'phonePhotoTip';
}

export const INITIAL_SEED_CASES: ExtendedCaseRecord[] = [
  {
    id: 'case_seed_1',
    title: 'Tomato · Leaf spots',
    crop: 'Tomato',
    symptom: 'Leaf spots',
    status: 'needs_review',
    cropPreset: 'leafSpots',
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    updatedAt: Date.now() - 1000 * 60 * 60 * 2,
    messages: [
      {
        id: 'seed_msg_1a',
        sender: 'user',
        text: 'I found these brown and dark spots on my lower tomato leaves. Are these leaf spots dangerous?',
        timestamp: Date.now() - 1000 * 60 * 60 * 2,
      },
      {
        id: 'seed_msg_1b',
        sender: 'agent',
        text: 'The concentric dark spots with yellow chlorotic halos strongly indicate Early Blight (Alternaria solani).',
        timestamp: Date.now() - 1000 * 60 * 60 * 2 + 15000,
        isDemo: true,
        diagnosisData: {
          crop: 'Tomato',
          symptom: 'Leaf spots',
          headline: 'Suspected Tomato Early Blight',
          description: 'Dark concentric target-board lesions on lower foliage. Spores spread rapidly with rain splash and high humidity.',
          suggestedTitle: 'Tomato · Leaf spots',
          nextSteps: [
            'Prune lower infected leaves at the stem joint and destroy away from the field.',
            'Avoid overhead sprinkler irrigation; apply water at ground level.',
            'Consider preventative bio-fungicide (Trichoderma or copper-based spray).',
          ],
          followUpPrompt: 'Can you inspect the stem near the soil level to confirm no dark lesions?',
          confidence: 'high',
        },
      },
    ],
  },
  {
    id: 'case_seed_2',
    title: 'Tomato · Leaf-mining damage',
    crop: 'Tomato',
    symptom: 'Leaf-mining damage',
    status: 'reviewed',
    cropPreset: 'leafMiner',
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    updatedAt: Date.now() - 1000 * 60 * 60 * 24,
    messages: [
      {
        id: 'seed_msg_2a',
        sender: 'user',
        text: 'What are these trails on my tomato leaves?',
        timestamp: Date.now() - 1000 * 60 * 60 * 24,
      },
      {
        id: 'seed_msg_2b',
        sender: 'agent',
        text: 'The winding trails suggest leaf mining. I can’t see the insect in this photo.',
        timestamp: Date.now() - 1000 * 60 * 60 * 24 + 12000,
        isDemo: true,
        diagnosisData: {
          crop: 'Tomato',
          symptom: 'Leaf-mining damage',
          headline: 'Possible leaf-miner damage',
          description: 'The winding trails suggest leaf mining. I can’t see the insect in this photo.',
          suggestedTitle: 'Tomato · Leaf-mining damage',
          nextSteps: [
            'Pinch off heavily mined leaflets to remove developing larvae inside the leaf tissue.',
            'Deploy yellow sticky cards around the canopy to trap adult leafminer flies.',
            'Neem seed kernel extract (NSKE 5%) can be applied as an eco-friendly deterrent.',
          ],
          followUpPrompt: 'Can you share a close-up of another affected leaf?',
          confidence: 'high',
        },
      },
      {
        id: 'seed_msg_2c',
        sender: 'agent',
        text: 'Can you share a close-up of another affected leaf?',
        timestamp: Date.now() - 1000 * 60 * 60 * 24 + 14000,
      },
    ],
  },
  {
    id: 'case_seed_3',
    title: 'Tomato · Curled leaves',
    crop: 'Tomato',
    symptom: 'Curled leaves',
    status: 'follow_up_needed',
    cropPreset: 'curledLeaves',
    createdAt: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
    updatedAt: Date.now() - 1000 * 60 * 60 * 48,
    messages: [
      {
        id: 'seed_msg_3a',
        sender: 'user',
        text: 'Leaves are rolling upward and looking stunted. Need urgent diagnosis.',
        timestamp: Date.now() - 1000 * 60 * 60 * 48,
      },
      {
        id: 'seed_msg_3b',
        sender: 'agent',
        text: 'Upward leaf cupping and thickening often points to Tomato Yellow Leaf Curl Virus (TYLCV) or heavy whitefly infestation.',
        timestamp: Date.now() - 1000 * 60 * 60 * 48 + 18000,
        isDemo: true,
        diagnosisData: {
          crop: 'Tomato',
          symptom: 'Curled leaves',
          headline: 'Severe Leaf Curled Symptoms',
          description: 'Upward rolling with stunted shoots. Vector check recommended immediately.',
          suggestedTitle: 'Tomato · Curled leaves',
          nextSteps: [
            'Gently tap branch over a dark clipboard to check for whitefly flutters.',
            'Remove severely stunted plants to avoid virus reservoir spreading to adjacent beds.',
          ],
          followUpPrompt: 'Are you seeing small white insects under the leaves?',
          confidence: 'medium',
        },
      },
    ],
  },
];
