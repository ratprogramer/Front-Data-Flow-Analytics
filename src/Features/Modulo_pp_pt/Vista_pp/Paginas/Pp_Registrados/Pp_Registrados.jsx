import { Pp_Registrados_organismo } from "../../Organismos/Pp_Registrados_organismo/Pp_Registrados_organismo"
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"

export function Pp_Registrados(){
    
    return(
        <div >
            <TituloPagina path={"/sub_menu_pp"} text={"Productos en proceso"}></TituloPagina>
            <Pp_Registrados_organismo></Pp_Registrados_organismo>
        </div>
    )
}