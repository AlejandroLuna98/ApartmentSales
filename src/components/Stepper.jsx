import React from 'react';
import { useNavigate } from 'react-router';
import { useButtonContext } from '../context/ButtonContext';

const Stepper = ({ nextStep, handleNextStep }) => {
  const navigate = useNavigate();
  const { buttonState } = useButtonContext();

  return (
    <button
      onClick={() => {
        handleNextStep(nextStep);
        navigate(`/${nextStep.path}`);
      }}
      disabled={buttonState}
    >
      Siguiente
    </button>
  );
};
export default Stepper;
