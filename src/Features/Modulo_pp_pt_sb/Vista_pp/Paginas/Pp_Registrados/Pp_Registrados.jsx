import { Pp_Registrados_organismo } from "../../Organismos/Pp_Registrados_organismo/Pp_Registrados_organismo"
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import './Pp_registrados.css'
import { useThemeContext } from "../../../../../context/ThemeContext";

export function Pp_Registrados(){
    const { contextTheme } = useThemeContext();
    
    return(
        <div className="pp_R" id={contextTheme}>
            <TituloPagina path={"/menu"} text={"Productos en proceso"} />
            <Pp_Registrados_organismo />
        </div>
    )
}