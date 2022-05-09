/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-debugging-utils */
import { fireEvent, render, waitFor } from '@testing-library/react';

import App from './App';
import { ButtonProvider } from './context/ButtonContext';
import { SummaryProvider } from './context/SummaryContext';

const getComponent = () => (
  <ButtonProvider>
    <SummaryProvider>
      <App />
    </SummaryProvider>
  </ButtonProvider>
);

test('should render the component', () => {
  const view = render(getComponent());
  expect(view).toBeDefined();
});

test('should complete the process', () => {
  const view = render(getComponent());
  const input = view.getByPlaceholderText(/Nombre y apellido/i);
  fireEvent.change(input, { target: { value: 'Alejandro Luna' } });
  expect(input.value).toBe('Alejandro Luna');
  const button = view.getByText(/Siguiente/i);
  fireEvent.click(button);

  const emailInput = view.getByPlaceholderText(/Correo electronico/);
  fireEvent.change(emailInput, {
    target: { value: 'alejandroluna0915@gmail.com' },
  });
  const emailButton = view.getByText(/Siguiente/i);
  fireEvent.click(emailButton);
  expect(emailInput.value).toBe('alejandroluna0915@gmail.com');

  const addressInput = view.getByPlaceholderText('Dirección');
  fireEvent.change(addressInput, {
    target: { value: 'carrera 12 # 75-36' },
  });
  expect(addressInput.value).toBe('carrera 12 # 75-36');
  const addressButton = view.getByText(/Siguiente/i);
  fireEvent.click(addressButton);

  const floorAddress = view.container.getElementsByClassName('input')[0];
  fireEvent.change(floorAddress, {
    target: { value: 2 },
  });
  expect(floorAddress.value).toBe('2');
  const floorButton = view.getByText(/Siguiente/i);
  fireEvent.click(floorButton);
});
