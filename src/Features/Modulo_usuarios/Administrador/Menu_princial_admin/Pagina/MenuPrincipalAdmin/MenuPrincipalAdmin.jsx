import { DatosAdmin } from "../../Organismos/DatosAdmin/DatosAdmin";
import { BotonesMenuAdmin } from "../../Organismos/BotonesMenuAdmin/BotonesMenuAdmin";
import "./MenuPrincipalAdmin.css"

export function MenuPrincipalAdmin(){
    return(
        <div className="MenuPrincipal-container-pagina-admin">
            <div className="main-menu-container-admin">
                <h1  className="Menu-titulo-container-admin" >Menú</h1>
                <BotonesMenuAdmin />
            </div>
            <DatosAdmin />
        </div>
    )
}