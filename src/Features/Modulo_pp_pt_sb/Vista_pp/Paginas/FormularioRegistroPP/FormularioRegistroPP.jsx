import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import { FormularioIngresoPP_organismo } from "../../Organismos/FormularioIngresoPP_organismo/FormularioIngresoPP_organismo"
import "./FormularioRegistroPP.modules.css"

export function FormularioRegistroPP_pagina(){

    return(
        <div className="FormularioIngresoPP-container-pagina">
            <TituloPagina path={"/menu"} text={"Registro"} />            
            <FormularioIngresoPP_organismo />
        </div>
    )
}
