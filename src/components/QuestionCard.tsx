import React from 'react';
// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';


type Props = {
  question: string;
  answers: string[];
  callback: (n: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: string | undefined;
  correctAnswer: string | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  correctAnswer,
  questionNumber,
  totalQuestions,
}) => (
  <Wrapper>
    <p className='number'>
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer !== "" && correctAnswer === answer ? "true" : "false"}
          clicked={userAnswer === answer ? "true" : "false"}
        >
          <button type="button" disabled={userAnswer ? true : false} value={answer} onClick={(ev) => callback(questionNumber, ev)}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;
