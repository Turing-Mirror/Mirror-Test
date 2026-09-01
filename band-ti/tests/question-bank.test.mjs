import assert from "node:assert/strict";
import test from "node:test";
import { QUESTION_COUNT, createQuestionSet, questionBank } from "../src/data/questions.js";

test("keeps a broad categorized question bank", () => {
  assert.equal(questionBank.length, 100);
  assert.equal(new Set(questionBank.map((item) => item.category)).size, 10);
  assert.equal(new Set(questionBank.map((item) => item.id)).size, questionBank.length);

  for (const item of questionBank) {
    assert.equal(item.options.length, 4, item.id);
    for (const option of item.options) {
      assert.equal(option.values.length, 5, `${item.id}:${option.label}`);
      assert.ok(option.values.every((value) => Number.isInteger(value) && value >= 0));
    }
  }
});

test("creates deterministic balanced 20-question sessions", () => {
  const firstSet = createQuestionSet(20260901);
  const repeatSet = createQuestionSet(20260901);
  const ids = firstSet.map((item) => item.id);

  assert.equal(firstSet.length, QUESTION_COUNT);
  assert.deepEqual(ids, repeatSet.map((item) => item.id));
  assert.equal(new Set(ids).size, QUESTION_COUNT);

  const categoryCount = new Map();
  for (const item of firstSet) {
    categoryCount.set(item.category, (categoryCount.get(item.category) || 0) + 1);
  }
  assert.equal(categoryCount.size, 10);
  assert.ok([...categoryCount.values()].every((count) => count === 2));
});
