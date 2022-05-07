import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  ApartmentAdressPage,
  ApartmentFeaturePage,
  ApartmentFloorPage,
  ClientInfoPage,
  SummaryPage,
  ValidateEmailPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'datos-cliente'} element={<ClientInfoPage />} />
        <Route path={'validacion-correo'} element={<ValidateEmailPage />} />
        <Route path={'direccion'} element={<ApartmentAdressPage />} />
        <Route path={'piso'} element={<ApartmentFloorPage />} />
        <Route path={'caracteristicas'} element={<ApartmentFeaturePage />} />
        <Route path={'resumen'} element={<SummaryPage />} />
        <Route path={'/'} element={<ClientInfoPage />} />
        <Route path={'*'}  element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
