import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import { FormularioIngresoPP_organismo } from "../../Organismos/FormularioIngresoPP_organismo/FormularioIngresoPP_organismo"

export function FormularioRegistroPP_pagina(){
    return(
        <>
            <TituloPagina path={"/sub_menu_pp"} text={"Registro"}></TituloPagina>
            <FormularioIngresoPP_organismo ></FormularioIngresoPP_organismo>
        </>
    )
}
