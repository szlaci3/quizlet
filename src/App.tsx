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
      setIsLoading(false);
      setCurrentAnswer("");
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const isCorrect = questions[answerCounter].correct_answer === answer;
    if (isCorrect) {
      dispatch(INCREMENT_SCORE());
    }
    setCurrentAnswer(answer);
    setIsGameOver(answerCounter === TOTAL_QUESTIONS / 2 - 1);
  };

  const nextQuestion = () => {
    setCurrentAnswer("");
    dispatch(INCREMENT_COUNTER());
  };

  return (
    <>
      <h1>React Quiz</h1>
      <div>
        <p>Sore is {score}.</p>
      </div>

      {isGameOver || answerCounter === TOTAL_QUESTIONS / 2 ? (
        <div>
          <p>Game Over! Your final score is {score} out of {TOTAL_QUESTIONS / 2}.</p>
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
