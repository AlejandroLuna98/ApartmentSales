/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import data from './data/data.json';
import { useButtonContext } from './context/ButtonContext';
import { useSummaryContext } from './context/SummaryContext';
import {
  ApartmentAddressPage,
  ApartmentFloorPage,
  ClientInfoPage,
  ValidateEmailPage,
} from './pages';
import { Stepper } from './components';
import style from './styles/app.module.css';

function App() {
  const [steps] = useState(data.steps || null);
  const [currentStep, setCurrentStep] = useState({});
  const [nextPath, setNextPath] = useState({});
  const [showModal, setShowModal] = useState(false);
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
  };
  const handleNextStep = (nextStep) => {
    setCurrentStep(steps.find((item) => item.step === nextStep.step));
  };

  const renderer = () => {
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

  const handleModal = () => {
    setShowModal((s) => !s);
  };

  const summary = () => {
    return (
      <div className={style.summary}>
        <h2 className={style.title}>Resumen</h2>
        <p>
          Nombre: <span className={style.text}>{summaryState.name}</span>
        </p>
        <p>
          Correo: <span className={style.text}>{summaryState.email}</span>
        </p>
        <p>
          Dirección: <span className={style.text}>{summaryState.address}</span>
        </p>
        <p>
          Piso: <span className={style.text}>{summaryState.floor}</span>
        </p>
        <button className={style.input} onClick={handleModal}>
          Cerrar
        </button>
      </div>
    );
  };
  return (
    <BrowserRouter>
      <div>
        <header className={style.header}>
          <p>
            Paso actual: <span className={style.span}>{currentStep.step}</span>
          </p>
          <p>
            Pasos restantes:
            <span className={style.span}>
              {steps.length - currentStep.step}
            </span>
          </p>
        </header>
        <main className={style.content}>
          <Routes>{renderer()}</Routes>
        </main>
        <button className={style.input} onClick={handleModal}>
          Resumen
        </button>
        {showModal ? summary() : <></>}
      </div>
    </BrowserRouter>
  );
}

export default App;
