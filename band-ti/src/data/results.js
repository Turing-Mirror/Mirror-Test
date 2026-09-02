import { characters } from "./characters.js";

const MATCH_STRENGTH = 5.5;

// These offsets are calibrated against uniformly selected answers from the current 150-question bank and 72-character roster.
// Keep the distribution test with this table whenever question or character profiles change.
const PROFILE_BALANCE_OFFSETS = Object.freeze({
  "4,4,2,3,5": 1.936635,
  "2,4,4,2,2": 1.032202,
  "5,3,1,5,4": 0.230887,
  "1,5,3,1,4": 0.858613,
  "2,2,5,2,3": -0.691733,
  "4,1,4,5,1": -0.02137,
  "3,5,2,3,3": 0.91991,
  "2,3,4,1,5": -0.075999,
  "5,2,3,4,3": -0.917887,
  "5,2,2,5,2": -0.275814,
  "3,3,4,3,4": -0.754709,
  "3,3,3,4,3": -0.363303,
  "3,1,5,2,4": -1.520485,
  "1,4,5,1,5": 0.151478,
  "4,2,3,3,5": -0.508426,
});

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

function sumTraits(answers) {
  return answers.reduce(
    (total, values) => total.map((value, index) => value + values[index]),
    [0, 0, 0, 0, 0],
  );
}

function center(values) {
  const mean = values.reduce((total, value) => total + value, 0) / values.length;
  return values.map((value) => value - mean);
}

function cosineSimilarity(left, right) {
  let dotProduct = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (let index = 0; index < left.length; index += 1) {
    dotProduct += left[index] * right[index];
    leftMagnitude += left[index] ** 2;
    rightMagnitude += right[index] ** 2;
  }

  if (leftMagnitude === 0 || rightMagnitude === 0) {
    return 0;
  }

  return dotProduct / Math.sqrt(leftMagnitude * rightMagnitude);
}

function getProfileOffset(profile) {
  return PROFILE_BALANCE_OFFSETS[profile.join(",")] ?? 0;
}

function getMatchPercent(similarity) {
  return Math.max(45, Math.min(95, Math.round(70 + similarity * 25)));
}

function chooseWeighted(candidates, seed) {
  const random = createSeededRandom(seed);
  const target = random();
  let cumulativeProbability = 0;

  for (const candidate of candidates) {
    cumulativeProbability += candidate.probability;
    if (target <= cumulativeProbability) {
      return candidate;
    }
  }

  return candidates[candidates.length - 1];
}

function compareByMatch(first, second) {
  return second.similarity - first.similarity || first.id.localeCompare(second.id);
}

export function getResultCandidates(answers) {
  const traitScore = sumTraits(answers);
  const centeredTraits = center(traitScore);
  const unnormalizedCandidates = characters.map((character) => {
    const similarity = cosineSimilarity(centeredTraits, center(character.profile));

    return {
      ...character,
      similarity,
      score: getMatchPercent(similarity),
      logit: MATCH_STRENGTH * similarity + getProfileOffset(character.profile),
    };
  });
  const maximumLogit = Math.max(...unnormalizedCandidates.map((candidate) => candidate.logit));
  const totalWeight = unnormalizedCandidates.reduce(
    (total, candidate) => total + Math.exp(candidate.logit - maximumLogit),
    0,
  );

  return {
    traitScore,
    candidates: unnormalizedCandidates.map((candidate) => ({
      ...candidate,
      probability: Math.exp(candidate.logit - maximumLogit) / totalWeight,
    })),
  };
}

export function createQuizResult(answers, resultSeed = Date.now()) {
  const { traitScore, candidates } = getResultCandidates(answers);
  const selected = chooseWeighted(candidates, resultSeed);
  const rankedByMatch = [...candidates].sort(compareByMatch);

  return {
    traitScore,
    ranked: [selected, ...rankedByMatch.filter((candidate) => candidate.id !== selected.id)],
    maximumScore: 100,
    matchPercent: selected.score,
    questionCount: answers.length,
  };
}