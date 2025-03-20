import { PP_Registrados_prePT_organismo } from "../../Organismos/PP_Registrados_prePT_organismo/PP_Registrados_prePT_organismo"
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import './PP_Registrados_PrePT_pagina.css'
import { useThemeContext } from "../../../../../context/ThemeContext"

export function PP_Registrados_PrePT_pagina(){
    
    const { contextTheme } = useThemeContext();
    return(
        <div className="contPrePtPag" id={contextTheme}>
            <TituloPagina path={"/menu"} text={"Productos en proceso"} />
            <PP_Registrados_prePT_organismo />
        </div>
    )
}