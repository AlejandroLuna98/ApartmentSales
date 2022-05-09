import { createContext, useContext, useState } from 'react';

export const ButtonContext = createContext();

export const useButtonContext = () => useContext(ButtonContext);

export const ButtonProvider = ({ children }) => {
  const [buttonState, setButtonState] = useState(true);

  return (
    <ButtonContext.Provider value={{ buttonState, setButtonState }}>
      {children}
    </ButtonContext.Provider>
  );
};
