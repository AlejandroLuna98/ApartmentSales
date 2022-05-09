import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useButtonContext } from '../context/ButtonContext';
import { useSummaryContext } from '../context/SummaryContext';
import style from '../styles/pages/apartment-floor-page.module.css';

const ApartmentFloorPage = ({ props, nextButton }) => {
  const { setButtonState } = useButtonContext();
  const { summaryState, setSummaryState } = useSummaryContext();
  const [floorValue, setFloorValue] = useState('');

  const description = useMemo(
    () => props.description ?? '',
    [props.description]
  );

  const showError = useCallback(() => {
    if (!floorValue) return;
    return <p className={style.error}>Debes ingresar un valor valido</p>;
  }, [floorValue]);

  const handleOnchange = useCallback((e) => {
    const { value } = e.target;
    setFloorValue(value);
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (floorValue < 1 || floorValue > 50) {
      return setButtonState(true);
    }
    return setButtonState(false);
  }, [floorValue, setButtonState]);

  const handleOnblur = (e) => {
    if (e) {
      setSummaryState({ ...summaryState, floor: floorValue });
      return;
    }
    return;
  };
  return (
    <section className={style.container}>
      <h1>Piso</h1>
      <p>{description}</p>
      <input
        className={style.input}
        type="number"
        max={50}
        min={1}
        value={floorValue}
        onBlur={handleOnblur}
        onChange={handleOnchange}
      />
      {floorValue < 1 || floorValue > 50 ? showError() : <></>}
      {nextButton}
    </section>
  );
};
export default ApartmentFloorPage;
