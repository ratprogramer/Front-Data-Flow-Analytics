import { PP_Registrados_prePT_organismo } from "../../Organismos/PP_Registrados_prePT_organismo/PP_Registrados_prePT_organismo"
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import './PP_Registrados_PrePT_pagina.css'
export function PP_Registrados_PrePT_pagina(){
    
    return(
        <div className="contPrePtPag">
            <TituloPagina path={"/sub_menu_pt"} text={"Productos en proceso"} />
            <PP_Registrados_prePT_organismo />
        </div>
    )
}