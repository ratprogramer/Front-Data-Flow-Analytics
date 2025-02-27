import { Sb_Registrados_organismo } from "../../Organismos/Sb_Registrados_organismo/Sb_Registrados_organismo"
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"

export function Sb_Registrados(){
    
    return(
        <div >
            <TituloPagina path={"/sub_menu_sb"} text={"Saborizaciones"}></TituloPagina>
            <Sb_Registrados_organismo></Sb_Registrados_organismo>
        </div>
    )
}