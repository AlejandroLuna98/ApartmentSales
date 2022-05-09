import React, { useState } from 'react';
import { useButtonContext } from '../context/ButtonContext';
import { useSummaryContext } from '../context/SummaryContext';

const ClientInfoPage = ({ nextButton }) => {
  const { setButtonState } = useButtonContext();
  const { setSummaryState } = useSummaryContext();
  const [username, setUsername] = useState('');

  const validateUsername = (v) => {
    const regex = /^[a-zA-Z_ ]*$/;
    if (v && regex.test(v)) {
      setButtonState(false);
      return;
    }
    return setButtonState(true);
  };

  const handleUsername = (v) => {
    const { value } = v.target;
    setUsername(() => value);
    validateUsername(value);
  };

  const handleOnblur = (e) => {
    if (e) {
      setSummaryState({ name: username });
      return;
    }
    return;
  };

  return (
    <section>
      <h1>Bienvenido</h1>
      <p>
        Vamos a registrar tu inmueble, por favor ingresa tu nombre y apellido
      </p>
      <input
        onBlur={handleOnblur}
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
