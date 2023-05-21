import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question, QuestionsState } from "./types";
import {
  _SELECT_ANSWER,
  _INCREMENT_COUNTER,
  _RESET_COUNTER,
  _INCREMENT_SCORE,
  _RESET_SCORE,
} from "./actionTypes";
import { loadQuestions } from "./loadQuestions";

export interface QuizState {
  questions: QuestionsState[];
  userAnswer: string;
  answerCounter: number;
  score: number;
}

const initialState: QuizState = {
  questions: [],
  userAnswer: "",
  answerCounter: 0,
  score: 0,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    [_SELECT_ANSWER]: (state, action: PayloadAction<string>) => {
      state.userAnswer = action.payload;
    },
    [_INCREMENT_COUNTER]: (state) => {
      state.answerCounter += 1;
    },
    [_RESET_COUNTER]: (state) => {
      state.answerCounter = 0;
    },
    [_INCREMENT_SCORE]: (state) => {
      state.score += 1;
    },
    [_RESET_SCORE]: (state) => {
      state.score = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
  },
});

export const {
  [_SELECT_ANSWER]: SELECT_ANSWER,
  [_INCREMENT_COUNTER]: INCREMENT_COUNTER,
  [_RESET_COUNTER]: RESET_COUNTER,
  [_INCREMENT_SCORE]: INCREMENT_SCORE,
  [_RESET_SCORE]: RESET_SCORE,
} = quizSlice.actions;

export default quizSlice.reducer;
