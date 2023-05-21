export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: Difficulty;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

interface LoadQuestionsAction {
  type: "LOAD_QUESTIONS";
  payload: QuestionState[];
}

interface SelectAnswerAction {
  type: "SELECT_ANSWER";
  payload: string;
}

interface IncrementCounterAction {
  type: "INCREMENT_COUNTER";
}

interface ResetCounterAction {
  type: "RESET_COUNTER";
}

interface IncrementScoreAction {
  type: "INCREMENT_SCORE";
}

interface ResetScoreAction {
  type: "RESET_SCORE";
}

export type Action =
  | LoadQuestionsAction
  | SelectAnswerAction
  | IncrementCounterAction
  | ResetCounterAction
  | IncrementScoreAction
  | ResetScoreAction;
