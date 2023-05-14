import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// types
import { QuestionsState, Difficulty } from './types';

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [answerCounter, setAnswerCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);

  const startTrivia = async () => {
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
  };

  const checkAnswer = (answer: string) => {
    if (!isGameOver) {
      const isCorrect = questions[answerCounter].correct_answer === answer;
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      setCurrentAnswer(answer);
      setIsGameOver(answerCounter === TOTAL_QUESTIONS - 1);
      setAnswerCounter(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentAnswer("");
    if (answerCounter < TOTAL_QUESTIONS - 1) {
      setAnswerCounter(prev => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  return (
    <>
      <h1>React Quiz</h1>
      {isGameOver || answerCounter === TOTAL_QUESTIONS ? (
        <div>
          <p>Game Over! Your final score is {score} out of {TOTAL_QUESTIONS}.</p>
          <button onClick={startTrivia}>Start Again</button>
        </div>
      ) : (
        <QuestionCard
          questionNumber={answerCounter + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[answerCounter].question}
          answers={questions[answerCounter].answers}
          userAnswer={currentAnswer}
          callback={checkAnswer}
        />
      )}
      {!isGameOver && !loading && currentAnswer !== "" ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </>
  );
};

export default App;
