import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import { FormularioIngresoPT_organismo } from "../../Organismos/FormularioIngresoPT_organismo/FormularioIngresoPT_organismo"
import { useThemeContext } from "../../../../../context/ThemeContext";
import "./FormularioRegistroPT_pagina.css"

export function FormularioRegistroPT_pagina(){
    const contextTheme = useThemeContext();
    return(
        <div className="FormularioIngresoPT-container-pagina" id={contextTheme}>
            <TituloPagina path={"/productos_registrados_pp_"} text={"Registro"} />
            <FormularioIngresoPT_organismo />
        </div>
    )
}
