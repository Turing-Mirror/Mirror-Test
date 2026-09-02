import { characters } from "./characters.js";

export const HERO_GROUP_SIZE = 4;
export const HERO_ROTATION_DELAY = 3600;

export const heroCharacterGroups = Array.from(
  { length: Math.ceil(characters.length / HERO_GROUP_SIZE) },
  (_, index) => characters.slice(index * HERO_GROUP_SIZE, index * HERO_GROUP_SIZE + HERO_GROUP_SIZE),
);
