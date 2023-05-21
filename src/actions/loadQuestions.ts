// loadQuestions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { Difficulty } from '../types';
import { fetchQuizQuestions } from '../API';
import { TOTAL_QUESTIONS } from '../constants';

export const loadQuestions = createAsyncThunk<any>(
  'quiz/loadQuestions',
  async () => {
    try {
      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
      return newQuestions;
    }  catch (error) {
      console.error(error);
    }
  }
);
