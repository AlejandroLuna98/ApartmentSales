import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ButtonProvider } from './context/ButtonContext';
import { SummaryProvider } from './context/SummaryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ButtonProvider>
      <SummaryProvider>
        <App />
      </SummaryProvider>
    </ButtonProvider>
  </React.StrictMode>
);
