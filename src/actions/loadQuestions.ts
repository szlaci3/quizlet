// loadQuestions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { Difficulty } from '../types';
import { fetchQuizQuestions } from '../API';
import { TOTAL_QUESTIONS } from '../constants';

export const loadQuestions = createAsyncThunk<(dispatch: any) => Promise<void>, void>(
  'quiz/loadQuestions',
  () => async (dispatch) => {
    try {
      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
      dispatch({type: 'LOAD_QUESTIONS', payload: newQuestions});
    }  catch (error) {
      console.error(error);
    }
  }
);
