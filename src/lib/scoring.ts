import { Answer, PetType, DimScores } from '../types';
import { questions } from '../data/questions';

const PET_TYPES: PetType[] = ['dog', 'cat', 'rabbit', 'small', 'fish', 'bird'];

export function calcResult(answers: Answer[]): PetType {
  const totals = getTotalScores(answers);
  return getHighestPet(totals);
}

export function getTotalScores(answers: Answer[]): Record<PetType, number> {
  const totals: Record<PetType, number> = {
    dog: 0,
    cat: 0,
    rabbit: 0,
    small: 0,
    fish: 0,
    bird: 0
  };

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const option = question.options[answer.optionIndex];
    if (!option) return;

    PET_TYPES.forEach((pet) => {
      totals[pet] += option.score[pet];
    });
  });

  return totals;
}

export function getDimScores(answers: Answer[]): DimScores {
  const dims: DimScores = {};

  PET_TYPES.forEach((pet) => {
    dims[pet] = { dog: 0, cat: 0, rabbit: 0, small: 0, fish: 0, bird: 0 };
  });

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const option = question.options[answer.optionIndex];
    if (!option) return;

    if (!dims[question.dim]) {
      dims[question.dim] = { dog: 0, cat: 0, rabbit: 0, small: 0, fish: 0, bird: 0 };
    }

    PET_TYPES.forEach((pet) => {
      dims[question.dim][pet] += option.score[pet];
    });
  });

  return dims;
}

function getHighestPet(scores: Record<PetType, number>): PetType {
  let highestPet: PetType = 'cat';
  let highestScore = -1;

  PET_TYPES.forEach((pet) => {
    if (scores[pet] > highestScore) {
      highestScore = scores[pet];
      highestPet = pet;
    }
  });

  return highestPet;
}

export function getPetRankings(scores: Record<PetType, number>): Array<{ pet: PetType; score: number }> {
  return PET_TYPES.map((pet) => ({ pet, score: scores[pet] })).sort((a, b) => b.score - a.score);
}
