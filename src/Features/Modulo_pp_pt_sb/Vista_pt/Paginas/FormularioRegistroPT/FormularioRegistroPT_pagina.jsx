import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import { FormularioIngresoPT_organismo } from "../../Organismos/FormularioIngresoPT_organismo/FormularioIngresoPT_organismo"

export function FormularioRegistroPT_pagina(){
    return(
        <>
            <TituloPagina path={"/productos_registrados_pp_"} text={"Registro"} />
            <FormularioIngresoPT_organismo />
        </>
    )
}
