import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1 1;
  padding: 20px;
  text-align: center;
  border-radius: 20px;
  border:1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  background: linear-gradient(135deg, rgba(3, 3, 0, .1), rgba(0,0,0, .7));
  
  &:first-child {
    background: linear-gradient(135deg, rgba(74, 76, 6, .1), rgba(0, 0, 0, .2));
  }

  p {
    font-size: 1rem;
  }

  .q-text {
    color: #b99700;
  }
`;

export const Answers = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  height: calc(100vh - 460px);
  min-height: 100px;

  .row {
    display: inline-flex;
    justify-content: stretch;    
  }
`;

type ButtonWrapperProps = {
  correct: "true" | "false";
  clicked: "true" | "false";
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  flex: 1 0;
  transition: all 0.3s ease;
  white-space: nowrap;
  margin: 4px;

  :hover {
    opacity: 0.8;
  }

  button {
    border:1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    min-height: 40px;
    height: calc(25vh - 120px);
    background: ${({ correct, clicked }) =>
      correct === 'true'
        ? '#013001'
        : correct === 'false' && clicked === 'true'
        ? '#661300'
        : 'transparent'};
    border-radius: 10px;
    color: #fffc;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
    padding: 0 2vw;
  }
`;
