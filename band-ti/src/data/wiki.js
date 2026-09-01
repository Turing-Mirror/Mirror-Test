import links from "./moegirl-links.json";

const wikiByCharacterId = new Map(links.map((link) => [link.id, link]));

export function getWikiLink(character) {
  return wikiByCharacterId.get(character.id)?.moegirl_url || "";
}