import { Pt_Registrados_organismo } from "../../Organismos/Pt_Registrados_organismo/Pt_Registrados_organismo"
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import { useThemeContext } from "../../../../../context/ThemeContext";
import "./Pt_registrados.css"

export function Pt_Registrados(){
    const { contextTheme } = useThemeContext();
    return(
        <div className="pt_Rg" id={contextTheme}>
            <TituloPagina path={"/menu"} text={"Productos terminados"} />
            <Pt_Registrados_organismo />
        </div>
    )
}