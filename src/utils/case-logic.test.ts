import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateCaseTitle,
  filterCases,
  createCaseFromFirstMessage,
  appendMessageToCase,
  updateCaseStatus,
  renameCase,
} from './case-logic';
import { CaseRecord, ChatMessage } from '../types';

test('generateCaseTitle formats crop and symptom', () => {
  const title = generateCaseTitle('Tomato', 'Leaf spots');
  assert.equal(title, 'Tomato · Leaf spots');
});

test('generateCaseTitle falls back to first question snippet', () => {
  const title = generateCaseTitle(undefined, undefined, 'What are these white trails?');
  assert.equal(title, 'What are these white trails?');
});

test('generateCaseTitle falls back to date when empty', () => {
  const timestamp = 1730000000000;
  const title = generateCaseTitle(undefined, undefined, '', timestamp);
  assert.match(title, /^Crop scan · /);
});

test('createCaseFromFirstMessage starts with needs_review', () => {
  const msg: ChatMessage = {
    id: 'msg_1',
    sender: 'user',
    text: 'Check this leaf',
    timestamp: Date.now(),
  };
  const newCase = createCaseFromFirstMessage(msg, 'Tomato', 'Early blight');
  assert.equal(newCase.title, 'Tomato · Early blight');
  assert.equal(newCase.status, 'needs_review');
  assert.equal(newCase.messages.length, 1);
});

test('appendMessageToCase keeps case ID and updates diagnosis title if present', () => {
  const msg1: ChatMessage = {
    id: 'msg_1',
    sender: 'user',
    text: 'What is this?',
    timestamp: 1000,
  };
  const initialCase = createCaseFromFirstMessage(msg1);
  assert.equal(initialCase.title, 'What is this?');

  const replyMsg: ChatMessage = {
    id: 'msg_2',
    sender: 'agent',
    text: 'This looks like leaf mining.',
    timestamp: 2000,
    diagnosisData: {
      crop: 'Tomato',
      symptom: 'Leaf-mining damage',
      headline: 'Possible leaf-miner damage',
    },
  };

  const updated = appendMessageToCase(initialCase, replyMsg);
  assert.equal(updated.id, initialCase.id);
  assert.equal(updated.messages.length, 2);
  assert.equal(updated.crop, 'Tomato');
  assert.equal(updated.symptom, 'Leaf-mining damage');
  assert.equal(updated.title, 'Tomato · Leaf-mining damage');
});

test('filterCases filters by status and search text', () => {
  const cases: CaseRecord[] = [
    {
      id: '1',
      title: 'Tomato · Leaf spots',
      crop: 'Tomato',
      symptom: 'Leaf spots',
      status: 'needs_review',
      createdAt: 100,
      updatedAt: 500,
      messages: [],
    },
    {
      id: '2',
      title: 'Tomato · Leaf-mining damage',
      crop: 'Tomato',
      symptom: 'Leaf-mining damage',
      status: 'reviewed',
      createdAt: 200,
      updatedAt: 600,
      messages: [],
    },
    {
      id: '3',
      title: 'Tomato · Curled leaves',
      crop: 'Tomato',
      symptom: 'Curled leaves',
      status: 'follow_up_needed',
      createdAt: 300,
      updatedAt: 700,
      messages: [],
    },
  ];

  const reviewedOnly = filterCases(cases, 'reviewed');
  assert.equal(reviewedOnly.length, 1);
  assert.equal(reviewedOnly[0].title, 'Tomato · Leaf-mining damage');

  const searchSpots = filterCases(cases, 'all', 'spots');
  assert.equal(searchSpots.length, 1);
  assert.equal(searchSpots[0].title, 'Tomato · Leaf spots');

  // Newest activity first
  const allSorted = filterCases(cases, 'all');
  assert.equal(allSorted[0].id, '3');
});

test('updateCaseStatus and renameCase work immutably', () => {
  const baseCase: CaseRecord = {
    id: 'case_1',
    title: 'Original Title',
    status: 'needs_review',
    createdAt: 100,
    updatedAt: 100,
    messages: [],
  };

  const reviewed = updateCaseStatus(baseCase, 'reviewed');
  assert.equal(reviewed.status, 'reviewed');
  assert.equal(baseCase.status, 'needs_review'); // unchanged

  const renamed = renameCase(baseCase, 'North Field · Row 4 Tomato');
  assert.equal(renamed.title, 'North Field · Row 4 Tomato');
});
