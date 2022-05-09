import React, { useCallback, useState } from 'react';
import { useButtonContext } from '../context/ButtonContext';

const ApartmentAddressPage = ({ nextButton }) => {
  const { setButtonState } = useButtonContext();
  const [addressValue, setAddressValue] = useState('');

  const validateAddress = useCallback(
    (v) => {
      const regex =
        /^(Autopista|Avenida|Avenida Calle|Avenida Carrera|Cra|Cll|Avenida|Carrera|Calle|Carrera|Circunvalar|Diagonal|Kilometro|Transversal|AUTOP|AV|AC|AK|CL|KR|CCV|DG|KM|TV)(\s)?([a-zA-Z]{0,15}|[0-9]{1,3})(\s)?[a-zA-Z]?(\s)?(bis)?(\s)?(Este|Norte|Occidente|Oeste|Sur)?(\s)?(#(\s)?[0-9]{1,2}(\s)?[a-zA-Z]?(\s)?(bis)?(\s)?(Este|Norte|Occidente|Oeste|Sur)?(\s)?(-)?(\s)?[0-9]{1,3}(\s)?(Este|Norte|Occidente|Oeste|Sur)?)?((\s)?(Agrupación|Altillo|Apartamento|Apartamento Sótano|Barrio|Bloque|Bodega|Cabecera Municipal|Callejón|Camino|Carretera|Casa|Caserio|Célula|Centro|Centro Comercial|Centro Urbano|Circular|Condominio|Conjunto|Consultorio|Corregimiento|Deposito|Deposito |Sótano|Edificio|Entrada|Esquina|Etapa|Finca|Garaje|Garaje Sótano|Grada|Inferior|Inspección de Policia|Interior|Kilometro|Local|Local Mezzanine|Local Sótano|Lote|Manzana|Manzanita|Mejora|Mezzanine|Módulo|Municipio|Núcleo|Oficina|Oficina Sótano|Parcela|Parcelación|Pasaje|Penthouse|Piso|Porteria|Predio|Principal|Puente|Quebrada|Salon|Sector|Semisótano|Suite|Supermanzana|Terraza|Torre|Troncal|Unidad|Urbanización|Vereda|Via|Zona|AGN|AL|APTO|AS|BR|BL|BG|CM|CLJ|CN|CT|CA|CAS|CEL|CE|CECO|CEUR|CIR|CDM|CONJ|CS|CO|DP|DS|ED|EN|ESQ|ET|FCA|GJ|GS|GR|INF|IP|IN|KM|LC|LM|LS|LT|MZ|MZTA|MJ|MN|MD|MUN|NCO|OF|OS|PA|PCN|PSJ|PH|PI|PT|PD|PPAL|PN|QDA|SA|SEC|SS|SU|SMZ|TZ|TO|TRL|UN|URB|VDA|VIA|ZN)?(\s)?[1-9][0-9]{0,3})*$/i;
      if (regex.test(v)) {
        return setButtonState(false);
      }
      return setButtonState(true);
    },
    [setButtonState]
  );

  const handleOnchange = useCallback(
    (e) => {
      const { value } = e.target;
      setAddressValue(value);
      validateAddress(value);
    },
    [validateAddress]
  );

  return (
    <section>
      <h1>Dirección</h1>
      <p>Ingresa la dirección del inmueble</p>
      <input
        type="text"
        value={addressValue}
        onChange={handleOnchange}
        placeholder="Dirección"
      />
      {nextButton}
    </section>
  );
};
export default ApartmentAddressPage;
