import React, { useCallback, useMemo, useState } from 'react';
import { useButtonContext } from '../context/ButtonContext';
import { useSummaryContext } from '../context/SummaryContext';
import style from '../styles/pages/validate-email-page.module.css';

const ValidateEmailPage = ({ props, nextButton }) => {
  const { setButtonState } = useButtonContext();
  const { summaryState, setSummaryState } = useSummaryContext();
  const [emailValue, setEmailValue] = useState('');

  const description = useMemo(
    () => props.description ?? '',
    [props.description]
  );
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

  const handleOnblur = (e) => {
    if (e) {
      setSummaryState({ ...summaryState, email: emailValue });
      return;
    }
    return;
  };

  return (
    <section className={style.container}>
      <h1>Correo Electronico</h1>
      <p>{description}</p>
      <input
        className={style.input}
        onBlur={handleOnblur}
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
