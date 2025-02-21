import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import { FormularioIngresoPT_organismo } from "../../Organismos/FormularioIngresoPT_organismo/FormularioIngresoPT_organismo"

export function FormularioRegistroPT_pagina(){
    return(
        <>
            <TituloPagina path={"/sub_menu_pt"} text={"Registro"}></TituloPagina>
            <FormularioIngresoPT_organismo ></FormularioIngresoPT_organismo>
        </>
    )
}
