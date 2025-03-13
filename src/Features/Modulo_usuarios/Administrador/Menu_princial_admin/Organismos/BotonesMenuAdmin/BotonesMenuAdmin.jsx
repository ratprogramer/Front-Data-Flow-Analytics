import { Boton } from "../../../../../../Atomos/Boton/Boton";
import { Users, UserRoundPlus } from "lucide-react";
import "./BotonesMenuAdmin.css"

export function BotonesMenuAdmin(){
    return(
        <div className="btns-container-menu">
            <Boton icon={<Users />} path={"/"} text={"Lista de usuarios"} />
            <Boton icon={<UserRoundPlus />} path={"/registro_usuario"} text={"Crear usuario"} />
        </div>
    )
}