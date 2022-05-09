import React from 'react';
import { useNavigate } from 'react-router';
import { useButtonContext } from '../context/ButtonContext';
import style from '../styles/components/stepper.module.css';
const Stepper = ({ nextStep, handleNextStep }) => {
  const navigate = useNavigate();
  const { buttonState } = useButtonContext();

  const stylesButton = () => {
    if (buttonState) {
      return style.disable;
    }
    return style.input;
  };
  return (
    <button
      onClick={() => {
        handleNextStep(nextStep);
        navigate(`/${nextStep.path}`);
      }}
      disabled={buttonState}
      className={stylesButton()}
    >
      Siguiente
    </button>
  );
};
export default Stepper;
