import React from 'react';
// Styles
import { Wrapper, Answers, ButtonWrapper } from './QuestionCard.styles';
import sanitizeHtml from 'sanitize-html';

type Props = {
  question: string;
  side: string;
  answers: string[];
  callback: (n: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: string | undefined;
  correctAnswer: string | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  side,
  answers,
  callback,
  userAnswer,
  correctAnswer,
  questionNumber,
  totalQuestions,
}) => {

  const renderAnswers = (answer: string) => (
    <ButtonWrapper
      key={answer}
      correct={userAnswer !== "" && correctAnswer === answer ? "true" : "false"}
      clicked={userAnswer === answer ? "true" : "false"}
    >
      <button type="button" disabled={userAnswer ? true : false} value={answer} onClick={(ev) => callback(questionNumber, ev)}>
        <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(answer) }} />
      </button>
    </ButtonWrapper>
  )
  
  return <Wrapper>
    <p>
      Question {side}
    </p>
    <p className='q-text' dangerouslySetInnerHTML={{ __html: sanitizeHtml(question) }} />
    <Answers>
      <div className="row">
        {answers.slice(0,2).map(renderAnswers)}
      </div>
      <div className="row">
        {answers.slice(2,4).map(renderAnswers)}
      </div>
    </Answers>
  </Wrapper>
};

export default QuestionCard;
