export type PetType = 'dog' | 'cat' | 'rabbit' | 'small' | 'fish' | 'bird';

export interface PetScores {
  dog: number;
  cat: number;
  rabbit: number;
  small: number;
  fish: number;
  bird: number;
}

export interface DimScores {
  A: PetScores;
  B: PetScores;
  C: PetScores;
  D: PetScores;
}

export interface QuestionOption {
  text: string;
  score: PetScores;
}

export interface Question {
  id: number;
  dim: 'A' | 'B' | 'C' | 'D';
  text: string;
  options: QuestionOption[];
}

export interface Answer {
  questionId: number;
  optionIndex: number;
}

export interface Session {
  id: string;
  answers: Answer[];
  dimScores: DimScores;
  petResult: PetType;
  isPaid: boolean;
  createdAt: string;
}

export interface Report {
  id?: string;
  session_id?: string;
  type_name?: string;
  why_fit?: string;
  daily_scene?: string;
  reminder?: string;
  keywords?: string[];
  created_at?: string;
}

export interface PetResult {
  pet: PetType;
  typeName: string;
  whyFit: string;
  dailyScene: string;
  reminder: string;
  keywords: string[];
}
