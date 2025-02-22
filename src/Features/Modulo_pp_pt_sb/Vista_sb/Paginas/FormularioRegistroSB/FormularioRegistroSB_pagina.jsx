import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
import { FormularioIngresoSB_organismo } from "../../Organismos/FormularioIngresoSB_organismo/FormularioIngresoSB_organismo";

export function FormularioRegistroSB_pagina() {
  return (
    <>
      <TituloPagina path={"/sub_menu_pp"} text={"Registro"} />
      <FormularioIngresoSB_organismo />
    </>
  );
}
