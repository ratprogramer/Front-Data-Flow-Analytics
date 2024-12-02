import { DatosUsuario } from "../Organismos/DatosUsuario";
import { MenuPrincipalBotones } from "../Organismos/MenuPrincipalBotones";
import "./MenuPrincipal.css"

export function MenuPrincipal(){
    return(
        <div className="MenuPrincipal-container-pagina">
            <div className="main-menu-container">
                <h1  className="Menu-titulo-container" >Menú</h1>
                <MenuPrincipalBotones></MenuPrincipalBotones>
            </div>
            <DatosUsuario></DatosUsuario>
        </div>
    )
}