import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { connect, useDispatch } from 'react-redux';
import { QuizState,
  INCREMENT_COUNTER,
  RESET_COUNTER,
  INCREMENT_SCORE,
  RESET_SCORE,
} from './quizSlice';
import { loadQuestions } from './actions/loadQuestions';
import { TOTAL_QUESTIONS } from './constants';

interface AppProps {
  answerCounter: number;
  score: number;
  questions: any[];
  loadQuestions: () => void;
}

const App: React.FC<AppProps> = ({ answerCounter, score, questions, loadQuestions }) => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isGameOver, setIsGameOver] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const startTrivia = async () => {
    setIsLoading(true);
    setIsGameOver(false);
    try {
      await loadQuestions();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(RESET_SCORE());
      dispatch(RESET_COUNTER());
      setIsLoading(false);
      setCurrentAnswer("");
    }
  };

  const checkAnswer = (questionNumber: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const isCorrect = questions[questionNumber - 1].correct_answer === answer;
    if (isCorrect) {
      dispatch(INCREMENT_SCORE());
    }
    setCurrentAnswer(answer);
  };

  const nextQuestion = () => {
    setCurrentAnswer("");
    if (answerCounter === TOTAL_QUESTIONS / 2 - 1) {
      setIsGameOver(true);
    } else {
      dispatch(INCREMENT_COUNTER());
    }
  };

  return (
    <>
      <h1>REACT QUIZ</h1>
      {isGameOver || answerCounter == TOTAL_QUESTIONS / 2 - 1 && currentAnswer !== "" ? (
        <button className='start' onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!isGameOver ? <p className='score'>Score: {score} out of {TOTAL_QUESTIONS / 2}.</p> : null}
      {isLoading ? <p>Loading Questions...</p> : null}
      {!isLoading && !isGameOver && (
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
        </>
      )}
      {!isGameOver && !isLoading && currentAnswer !== "" && answerCounter !== TOTAL_QUESTIONS / 2 - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </>
  );
};

const mapStateToProps = (state: QuizState) => {
  return {
    answerCounter: state.answerCounter,
    score: state.score,
    questions: state.questions,
  };
};

const mapDispatchToProps = {
  loadQuestions,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
