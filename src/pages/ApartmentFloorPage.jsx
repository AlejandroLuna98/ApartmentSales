import React, { useCallback, useEffect, useState } from 'react';
import { useButtonContext } from '../context/ButtonContext';

const ApartmentFloorPage = ({ nextButton }) => {
  const { setButtonState } = useButtonContext();
  const [floorValue, setFloorValue] = useState('');

  const showError = useCallback(() => {
    if (!floorValue) return;
    return <p>Debes ingresar un valor valido</p>;
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

  return (
    <section>
      <h1>Dirección</h1>
      <p>En que piso esta tu inmueble?</p>
      <input
        type="number"
        max={50}
        min={1}
        value={floorValue}
        onChange={handleOnchange}
      />
      {floorValue < 1 || floorValue > 50 ? showError() : <></>}
      {nextButton}
    </section>
  );
};
export default ApartmentFloorPage;
