import { Boton } from "../../../../../../Atomos/Boton/Boton";
import "./BotonesMenuAdmin.css"

export function BotonesMenuAdmin(){
    return(
        <div className="btns-container-menu">
            <Boton path={"/"} text={"Lista de usuarios"}></Boton>
            <Boton path={"/registro_usuario"} text={"Crear usuario"}></Boton>
        </div>
    )
}