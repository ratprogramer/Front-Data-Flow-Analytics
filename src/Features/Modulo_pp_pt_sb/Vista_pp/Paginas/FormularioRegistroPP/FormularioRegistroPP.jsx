import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import { FormularioIngresoPP_organismo } from "../../Organismos/FormularioIngresoPP_organismo/FormularioIngresoPP_organismo"
import { useNavigate } from "react-router-dom"
import "./FormularioRegistroPP.modules.css"

export function FormularioRegistroPP_pagina(){

    const navigate = useNavigate();

    return(
        <div className="FormularioIngresoPP-container-pagina">
            <TituloPagina path={"/menu"} text={"Registro"} />            

            <FormularioIngresoPP_organismo />
        </div>
    )
}
