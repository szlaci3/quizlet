import { shuffleArray } from './utils';
import { Question, Difficulty, QuestionState } from './types';

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const response = await fetch(endpoint)
  const data = await response.json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
  }))
};
