import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { characters } from "../src/data/characters.js";
import { createHeroCharacterGroups, HERO_GROUP_SIZE } from "../src/data/hero-roster.js";

test("shuffles every local character into compact complete stage groups", () => {
  const firstRound = createHeroCharacterGroups(characters, () => 0);
  const secondRound = createHeroCharacterGroups(characters, () => 0.999999);
  const ids = firstRound.flat().map((character) => character.id);

  assert.equal(HERO_GROUP_SIZE, 4);
  assert.equal(ids.length, characters.length);
  assert.equal(new Set(ids).size, characters.length);
  assert.equal(firstRound.length, Math.ceil(characters.length / HERO_GROUP_SIZE));
  assert.ok(firstRound.every((group) => group.length > 0 && group.length <= HERO_GROUP_SIZE));
  assert.notDeepEqual(
    firstRound.flat().map((character) => character.id),
    secondRound.flat().map((character) => character.id),
  );
});

test("keeps more tests as a primary home and result action", async () => {
  const source = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");

  assert.match(source, /hero-more-tests-button/);
  assert.match(source, /more-tests-section/);
  assert.match(source, /result-more-tests-cta/);
  assert.match(source, /footer-more-tests/);
  assert.match(source, /createHeroRoster/);
  assert.doesNotMatch(source, /stage-pagination/);
});
