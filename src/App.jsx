/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useButtonContext } from './context/ButtonContext';
import { useSummaryContext } from './context/SummaryContext';

import {
  ApartmentAddressPage,
  ApartmentFeaturePage,
  ApartmentFloorPage,
  ClientInfoPage,
  SummaryPage,
  ValidateEmailPage,
} from './pages';

import data from './data/data.json';
import { Stepper } from './components';

function App() {
  const [steps] = useState(data.steps || null);
  const [currentStep, setCurrentStep] = useState({});
  const [nextPath, setNextPath] = useState({});

  const { summaryState } = useSummaryContext();
  const { setButtonState } = useButtonContext();

  useEffect(() => {
    if (steps) {
      setCurrentStep(steps.find((item) => item.initial === true));
    }
  }, [steps]);

  useEffect(() => {
    const nextStep =
      steps.find((item) => item.step === currentStep.step + 1) || currentStep;
    setNextPath(nextStep);
    setButtonState(true);
  }, [currentStep, steps, setButtonState]);

  const components = {
    clientInfoPage: ClientInfoPage,
    validateEmailPage: ValidateEmailPage,
    apartmentAddressPage: ApartmentAddressPage,
    apartmentFloorPage: ApartmentFloorPage,
    apartmentFeaturePage: ApartmentFeaturePage,
    summary: SummaryPage,
  };
  const handleNextStep = (nextStep) => {
    setCurrentStep(steps.find((item) => item.step === nextStep.step));
  };

  const renderer = (config) => {
    if (!steps) return <> </>;

    return steps.map((step) => {
      const Component = components[step.component];
      return (
        <React.Fragment key={step.step}>
          <Route
            key={step.step}
            path={step.path}
            element={
              <Component
                props={step}
                nextButton={
                  <Stepper
                    nextStep={nextPath}
                    handleNextStep={handleNextStep}
                  />
                }
              />
            }
          />
          {step.initial ? (
            <Route path="/" element={<Navigate to={step.path} replace />} />
          ) : (
            <> </>
          )}
        </React.Fragment>
      );
    });
  };
  return (
    <BrowserRouter>
      <div>
        <p>Paso actual: {currentStep.step}</p>
        <p>Pasos restantes: {steps.length - currentStep.step}</p>
      </div>

      <Routes>{renderer()}</Routes>
      <div>
        <h2>Resumen</h2>
        <p>Nombre: {summaryState.name}</p>
        <p>Correo: {summaryState.email}</p>
        <p>Dirección: {summaryState.address}</p>
        <p>Piso: {summaryState.floor}</p>
      </div>
    </BrowserRouter>
  );
}

export default App;
