import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { characters } from "../src/data/characters.js";
import { HERO_GROUP_SIZE, heroCharacterGroups } from "../src/data/hero-roster.js";

test("rotates every local character through compact stage groups", () => {
  const ids = heroCharacterGroups.flat().map((character) => character.id);

  assert.equal(HERO_GROUP_SIZE, 4);
  assert.equal(ids.length, characters.length);
  assert.equal(new Set(ids).size, characters.length);
  assert.equal(heroCharacterGroups.length, Math.ceil(characters.length / HERO_GROUP_SIZE));
  assert.ok(heroCharacterGroups.every((group) => group.length > 0 && group.length <= HERO_GROUP_SIZE));
});

test("keeps more tests as a primary home and result action", async () => {
  const source = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");

  assert.match(source, /hero-more-tests-button/);
  assert.match(source, /more-tests-section/);
  assert.match(source, /result-more-tests-cta/);
  assert.match(source, /footer-more-tests/);
});
