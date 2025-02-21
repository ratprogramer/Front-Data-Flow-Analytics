import { DatosUsuario } from "../../../../Modulo_menus/Organismos/DatosUsuario/DatosUsuario"
import { SubIndicePT_organismo } from "../../Organismos/SubIndicePT_organismo/SubIndicePT_organismo"
import './SubIndicePT.css'

export function SubIndicePT(){
    return(
        <div className="subPT">
            <SubIndicePT_organismo />
            <DatosUsuario />
        </div>
    )
}