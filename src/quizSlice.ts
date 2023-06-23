import { createSlice } from "@reduxjs/toolkit";
import { QuestionState } from "./types";
import { loadQuestions } from "./actions/loadQuestions";

export interface QuizState {
  questions: QuestionState[];
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
    INCREMENT_COUNTER: (state) => {
      state.answerCounter += 1;
    },
    RESET_COUNTER: (state) => {
      state.answerCounter = 0;
    },
    INCREMENT_SCORE: (state) => {
      state.score += 1;
    },
    RESET_SCORE: (state) => {
      state.score = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
    builder.addCase(loadQuestions.pending, (state) => {
      state.questions = [];
    });
    builder.addCase(loadQuestions.rejected, (state) => {
      state.questions = [];
    });
  },
});

export const {
  INCREMENT_COUNTER,
  RESET_COUNTER,
  INCREMENT_SCORE,
  RESET_SCORE,
} = quizSlice.actions;

export default quizSlice.reducer;
