import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { catalogSummary, characters } from "../src/data/characters.js";
import { questionBank } from "../src/data/questions.js";

const expectedYumemitaIds = [
  "yumemita-arale",
  "yumemita-nonoka",
  "yumemita-ritsu",
  "yumemita-miyako",
  "yumemita-yuno",
];

test("includes the complete local YUME∞MITA roster with supplied Wiki links", () => {
  const wikiById = new Map(JSON.parse(readFileSync(resolve(process.cwd(), "src/data/moegirl-links.json"), "utf8")).map((link) => [link.id, link.moegirl_url]));
  const yumemita = characters.filter((character) => character.id.startsWith("yumemita-"));

  assert.equal(catalogSummary.characters, 72);
  assert.deepEqual(yumemita.map((character) => character.id), expectedYumemitaIds);

  for (const character of yumemita) {
    const assetPath = resolve(process.cwd(), "public", character.image.replace(/^\//, ""));
    assert.ok(existsSync(assetPath), `Missing local art for ${character.id}`);
    assert.match(wikiById.get(character.id), /^https:\/\/moegirl\.icu\//, `Missing Wiki link for ${character.id}`);
  }
});

test("keeps story-driven girl-band scenarios in the expanded question bank", () => {
  const sourceQuestionIds = [
    "connection-11",
    "connection-12",
    "stage-11",
    "creative-12",
    "daily-11",
    "listening-15",
  ];

  for (const id of sourceQuestionIds) {
    const question = questionBank.find((item) => item.id === id);
    assert.ok(question, `Missing story-driven question ${id}`);
    assert.equal(question.options.length, 4, id);
  }
});