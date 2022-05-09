import React, { useMemo, useState } from 'react';
import { useButtonContext } from '../context/ButtonContext';
import { useSummaryContext } from '../context/SummaryContext';
import style from '../styles/pages/client-info-page.module.css';
const ClientInfoPage = ({ props, nextButton }) => {
  const { setButtonState } = useButtonContext();
  const { setSummaryState } = useSummaryContext();
  const [username, setUsername] = useState('');

  const description = useMemo(
    () => props.description ?? '',
    [props.description]
  );
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
    <section className={style.container}>
      <h1>Bienvenido</h1>
      <p>{description}</p>
      <input
        onBlur={handleOnblur}
        type="text"
        value={username}
        onChange={handleUsername}
        placeholder="Nombre y apellido"
        className={style.input}
      />
      {nextButton}
    </section>
  );
};
export default ClientInfoPage;
