import assert from "node:assert/strict";
import test from "node:test";
import { characters } from "../src/data/characters.js";
import { createQuestionSet } from "../src/data/questions.js";
import { createQuizResult, getResultCandidates } from "../src/data/results.js";

function createSeededRandom(seed) {
  let state = Number(seed) >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createAnswers(sessionRandom) {
  const questionSeed = Math.floor(sessionRandom() * 0x100000000);
  const answerSeed = Math.floor(sessionRandom() * 0x100000000);
  const answerRandom = createSeededRandom(answerSeed);

  return createQuestionSet(questionSeed).map((question) => {
    const optionIndex = Math.floor(answerRandom() * question.options.length);
    return question.options[optionIndex].values;
  });
}

test("keeps the 72 character result probabilities close across randomized sessions", () => {
  const expectedHits = new Map(characters.map((character) => [character.id, 0]));
  const sampleCount = 15000;
  const sessionRandom = createSeededRandom(20260903);

  for (let sample = 0; sample < sampleCount; sample += 1) {
    const { candidates } = getResultCandidates(createAnswers(sessionRandom));
    const probabilityTotal = candidates.reduce((total, candidate) => total + candidate.probability, 0);
    assert.ok(Math.abs(probabilityTotal - 1) < 1e-12);

    for (const candidate of candidates) {
      expectedHits.set(candidate.id, expectedHits.get(candidate.id) + candidate.probability);
    }
  }

  const values = [...expectedHits.values()];
  const lowest = Math.min(...values);
  const highest = Math.max(...values);

  assert.ok(lowest > 0);
  assert.ok(
    highest / lowest < 1.08,
    `Expected distribution is too uneven: lowest ${lowest.toFixed(2)}, highest ${highest.toFixed(2)}`,
  );
});

test("uses a stable independent result draw after answers are scored", () => {
  const answers = createAnswers(createSeededRandom(1729));
  const first = createQuizResult(answers, 42);
  const repeat = createQuizResult(answers, 42);
  const outcomes = new Set();

  for (let seed = 0; seed < 256; seed += 1) {
    outcomes.add(createQuizResult(answers, seed).ranked[0].id);
  }

  assert.equal(first.ranked[0].id, repeat.ranked[0].id);
  assert.ok(outcomes.size > 5, `Only ${outcomes.size} characters were reachable for the same answer profile.`);
});