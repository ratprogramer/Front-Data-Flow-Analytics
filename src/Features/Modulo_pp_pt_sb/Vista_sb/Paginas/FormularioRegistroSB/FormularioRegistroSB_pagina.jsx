import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
import { FormularioIngresoSB_organismo } from "../../Organismos/FormularioIngresoSB_organismo/FormularioIngresoSB_organismo";

import "./FormularioRegistroSB_pagina.css";

export function FormularioRegistroSB_pagina() {
  return (
    <div className="FormularioIngresoSB-container-pagina">
      <TituloPagina path={"/menu"} text={"Registro"} />
      <FormularioIngresoSB_organismo />
    </div>
  );
}
