import React, { useCallback, useState } from 'react';
import { useButtonContext } from '../context/ButtonContext';

const ValidateEmailPage = ({ nextButton }) => {
  const { setButtonState } = useButtonContext();
  const [emailValue, setEmailValue] = useState('');

  const validateEmail = useCallback(
    (v) => {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) {
        return setButtonState(false);
      }
      return setButtonState(true);
    },
    [setButtonState]
  );

  const handleOnchange = useCallback(
    (e) => {
      const { value } = e.target;
      setEmailValue(value);
      validateEmail(value);
    },
    [validateEmail]
  );

  return (
    <section>
      <h1>Correo Electronico</h1>
      <p>Ingresa tu email para ponernos en contacto contigo</p>
      <input
        type="email"
        value={emailValue}
        onChange={handleOnchange}
        placeholder="Correo electronico"
      />
      {nextButton}
    </section>
  );
};
export default ValidateEmailPage;
