import { TituloPagina } from "../../../../../Moleculas/InputGroup/TituloPagina"
import { FormularioRegistroPP } from "../../Organismos/FormularioIngresoPP_organismo/FormularioIngresoPP_organismo"

export function FormularioRegistroPP_pagina(){
    return(
        <>
            <TituloPagina path={"/menu_Derivado_lacteo_fermentado"} text={"Registro"}></TituloPagina>
            <FormularioRegistroPP ></FormularioRegistroPP>
        </>
    )
}
