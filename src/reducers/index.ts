import { QuestionsState, Action } from "../types";
import { Reducer } from "redux";

export interface RootState {
  questions: QuestionsState[];
  userAnswer: string;
  answerCounter: number;
  score: number;
}

const initialState: RootState = {
  questions: [],
  userAnswer: "",
  answerCounter: 0,
  score: 0,
};

export const rootReducer: Reducer<RootState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "LOAD_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
      };
    case "SELECT_ANSWER":
      return {
        ...state,
        userAnswer: action.payload,
      };
    case "INCREMENT_COUNTER":
      return {
        ...state,
        answerCounter: state.answerCounter + 1,
      };
    case "RESET_COUNTER":
      return {
        ...state,
        answerCounter: 0,
      };
    case "INCREMENT_SCORE":
      return {
        ...state,
        score: state.score + 1,
      };
    case "RESET_SCORE":
      return {
        ...state,
        score: 0,
      };
    default:
      return state;
  }
};
