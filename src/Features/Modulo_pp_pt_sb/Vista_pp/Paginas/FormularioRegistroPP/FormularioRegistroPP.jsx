import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import { FormularioIngresoPP_organismo } from "../../Organismos/FormularioIngresoPP_organismo/FormularioIngresoPP_organismo"
import "./FormularioRegistroPP.css"

export function FormularioRegistroPP_pagina(){
    return(
        <div className="FormularioIngresoPP-container-pagina">
            <TituloPagina path={"/sub_menu_pp"} text={"Registro"} />
            <FormularioIngresoPP_organismo />
        </div>
    )
}
