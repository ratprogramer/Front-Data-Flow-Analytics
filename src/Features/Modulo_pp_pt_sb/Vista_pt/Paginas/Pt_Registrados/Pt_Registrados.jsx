import { Pt_Registrados_organismo } from "../../Organismos/Pt_Registrados_organismo/Pt_Registrados_organismo"
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"

export function Pt_Registrados(){
    
    return(
        <div >
            <TituloPagina path={"/sub_menu_pt"} text={"Productos terminados"} />
            <Pt_Registrados_organismo />
        </div>
    )
}