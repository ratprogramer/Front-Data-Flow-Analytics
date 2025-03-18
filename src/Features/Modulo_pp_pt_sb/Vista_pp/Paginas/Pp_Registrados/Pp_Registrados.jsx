import { Pp_Registrados_organismo } from "../../Organismos/Pp_Registrados_organismo/Pp_Registrados_organismo"
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import './Pp_registrados.css'

export function Pp_Registrados(){
    
    return(
        <div className="pp_R">
            <TituloPagina path={"/menu_Derivado_lacteo_fermentado"} text={"Productos en proceso"} />
            <Pp_Registrados_organismo />
        </div>
    )
}