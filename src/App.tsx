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
  const [isGameOver, setIsGameOver] = useState(true);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const startTrivia = async () => {
    setIsLoading(true);
    setIsGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setAnswerCounter(0);
    setIsLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const isCorrect = questions[answerCounter].correct_answer === answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setCurrentAnswer(answer);
    setIsGameOver(answerCounter === TOTAL_QUESTIONS / 2 - 1);
  };

  const nextQuestion = () => {
    setCurrentAnswer("");
    setAnswerCounter(prev => prev + 1);
  };

  return (
    <>
      <h1>React Quiz</h1>
      {isGameOver || answerCounter === TOTAL_QUESTIONS / 2 ? (
        <div>
          <p>Game Over! Your final score is {score} out of {TOTAL_QUESTIONS}.</p>
          <button onClick={startTrivia}>Start Again</button>
        </div>
      ) : isLoading ? (
        <p>Loading Questions...</p>
      ) : (
        <>
          <QuestionCard
            questionNumber={answerCounter * 2 + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[answerCounter * 2].question}
            answers={questions[answerCounter * 2].answers}
            correctAnswer={questions[answerCounter * 2].correct_answer}
            userAnswer={currentAnswer}
            callback={checkAnswer}
          />
          <QuestionCard
            questionNumber={answerCounter * 2 + 2}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[answerCounter * 2 + 1].question}
            answers={questions[answerCounter * 2 + 1].answers}
            correctAnswer={questions[answerCounter * 2 + 1].correct_answer}
            userAnswer={currentAnswer}
            callback={checkAnswer}
          />
          {currentAnswer !== "" && answerCounter !== TOTAL_QUESTIONS / 2 - 1 ? (
            <button className='next' onClick={nextQuestion}>
              Next Question
            </button>
          ) : null}
        </>
      )}
    </>
  );
  
};

export default App;
