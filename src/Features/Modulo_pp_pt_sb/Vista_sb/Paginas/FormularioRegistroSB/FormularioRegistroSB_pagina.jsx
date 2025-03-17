import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
import { FormularioIngresoSB_organismo } from "../../Organismos/FormularioIngresoSB_organismo/FormularioIngresoSB_organismo";

export function FormularioRegistroSB_pagina() {
  return (
    <>
      <TituloPagina path={"/menu_Derivado_lacteo_fermentado"} text={"Registro"} />
      <FormularioIngresoSB_organismo />
    </>
  );
}
