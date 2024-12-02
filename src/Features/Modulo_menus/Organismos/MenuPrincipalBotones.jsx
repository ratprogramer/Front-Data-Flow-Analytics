import { Boton } from "../../../Atomos/Boton/Boton";
import "./MenuPrincipalBotones.css"

export function MenuPrincipalBotones(){
    return(
        <div className="btns-container-menu">
            <Boton path={"/"} text={"Derivado Lácteo Fermentado"}></Boton>
            <Boton path={"/"} text={"Producto UHT"}></Boton>
            <Boton path={"/"} text={"Materia Prima"}></Boton>
            <Boton path={"/"} text={"Aguas y Enjuagues"}></Boton>
            <Boton path={"/"} text={"Superficies y Equipos"}></Boton>
            <Boton path={"/"} text={"Ambientes"}></Boton>
            <Boton path={"/"} text={"Manipuladores"}></Boton>
            <Boton path={"/"} text={"Informes y Registros"}></Boton>
        </div>
    )
}