import type { PetScores, DimScores, Answer } from "../data/questions";
import { questions } from "../data/questions";

export function calculateScores(answers: Answer[]): DimScores {
  const scores: DimScores = {
    A: { dog: 0, cat: 0, rabbit: 0, small: 0, fish: 0, bird: 0 },
    B: { dog: 0, cat: 0, rabbit: 0, small: 0, fish: 0, bird: 0 },
    C: { dog: 0, cat: 0, rabbit: 0, small: 0, fish: 0, bird: 0 },
    D: { dog: 0, cat: 0, rabbit: 0, small: 0, fish: 0, bird: 0 },
  };

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const option = question.options[answer.optionIndex];
    if (!option) continue;

    const dim = question.dim;
    const petScores = option.score;

    scores[dim].dog += petScores.dog;
    scores[dim].cat += petScores.cat;
    scores[dim].rabbit += petScores.rabbit;
    scores[dim].small += petScores.small;
    scores[dim].fish += petScores.fish;
    scores[dim].bird += petScores.bird;
  }

  return scores;
}

export type PetType = "dog" | "cat" | "rabbit" | "small" | "fish" | "bird";

export function getWinningPetType(dimScores: DimScores): PetType {
  const totals = calculateTotals(groupScores);
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  // If tie, prefer by A dimension score
  if (sorted[0][1] === sorted[1][1]) {
    const [petA, scoreA] = sorted[0];
    const [petB, scoreB] = sorted[1];
    if (dimScores.A[petA as PetType] === dimScores.A[petB as PetType]) {
      return petA as PetType;
    }
    return dimScores.A[petA as PetType] > dimScores.A[petB as PetType] ? petA : petB;
  }

  return sorted[0][0] as PetType;
}

function calculateTotals(dimScores: DimScores): PetScores {
  return {
    dog: dimScores.A.dog + dimScores.B.dog + dimScores.C.dog + dimScores.D.dog,
    cat: dimScores.A.cat + dimScores.B.cat + dimScores.C.cat + dimScores.D.cat,
    rabbit: dimScores.A.rabbit + dimScores.B.rabbit + dimScores.C.rabbit + dimScores.D.rabbit,
    small: dimScores.A.small + dimScores.B.small + dimScores.C.small + dimScores.D.small,
    fish: dimScores.A.fish + dimScores.B.fish + dimScores.C.fish + dimScores.D.fish,
    bird: dimScores.A.bird + dimScores.B.bird + dimScores.C.bird + dimScores.D.bird,
  };
}
