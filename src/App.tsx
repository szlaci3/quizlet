import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// types
import { QuestionsState, Difficulty } from './API';

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [answerCounter, setAnswerCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  return <>
    
  </>
}

export default App;
