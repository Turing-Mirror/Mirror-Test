import { characters } from "./characters.js";

export const HERO_GROUP_SIZE = 4;
export const HERO_ROTATION_DELAY = 3600;

export function createHeroCharacterGroups(source = characters, random = Math.random) {
  const shuffled = [...source];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return Array.from(
    { length: Math.ceil(shuffled.length / HERO_GROUP_SIZE) },
    (_, index) => shuffled.slice(index * HERO_GROUP_SIZE, index * HERO_GROUP_SIZE + HERO_GROUP_SIZE),
  );
}
