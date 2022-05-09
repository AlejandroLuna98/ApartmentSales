import { createContext, useContext, useState } from 'react';

export const SummaryContext = createContext();

export const useSummaryContext = () => useContext(SummaryContext);

export const SummaryProvider = ({ children }) => {
  const [summaryState, setSummaryState] = useState({
    name: null,
    email: null,
    address: null,
    floor: null,
    characters: {
      bbq: null,
      hall: null,
      playground: null,
    },
  });

  return (
    <SummaryContext.Provider value={{ summaryState, setSummaryState }}>
      {children}
    </SummaryContext.Provider>
  );
};
