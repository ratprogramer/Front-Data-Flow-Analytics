import { Sb_Registrados_organismo } from "../../Organismos/Sb_Registrados_organismo/Sb_Registrados_organismo"
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"

export function Sb_Registrados(){
    
    return(
        <div >
            <TituloPagina path={"/menu"} text={"Saborizaciones"} />
            <Sb_Registrados_organismo />
        </div>
    )
}