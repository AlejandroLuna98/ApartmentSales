import React, { useCallback, useState } from 'react';
import { useButtonContext } from '../context/ButtonContext';

const ClientInfoPage = ({ nextButton }) => {
  const { setButtonState } = useButtonContext();
  const [username, setUsername] = useState('');

  const validateUsername = useCallback(
    (v) => {
      const regex = /^[a-zA-Z_ ]*$/;

      if (v && regex.test(v)) {
        return setButtonState(false);
      }
      return setButtonState(true);
    },
    [setButtonState]
  );
  const handleUsername = useCallback(
    (v) => {
      const { value } = v.target;
      setUsername(() => value);
      validateUsername(value);
    },
    [setUsername, validateUsername]
  );
  return (
    <section>
      <h1>Bienvenido</h1>
      <p>
        Vamos a registrar tu inmueble, por favor ingresa tu nombre y apellido
      </p>
      <input
        type="text"
        value={username}
        onChange={handleUsername}
        placeholder="Nombre y apellido"
      />
      {nextButton}
    </section>
  );
};
export default ClientInfoPage;
