import { Boton } from "../../../../Atomos/Boton/Boton";
import "./MenuPrincipalBotones.css"

export function MenuPrincipalBotones(){
    return(
        <div className="btns-container-menu">
            <Boton path={"/menu_Derivado_lacteo_fermentado"} text={"Derivado Lácteo Fermentado"}/>
            <Boton path={"/"} text={"Producto UHT"}/>
            <Boton path={"/"} text={"Materia Prima"}/>
            <Boton path={"/"} text={"Aguas y Enjuagues"}/>
            <Boton path={"/"} text={"Superficies y Equipos"}/>
            <Boton path={"/"} text={"Ambientes"}/>
            <Boton path={"/"} text={"Manipuladores"}/>
            <Boton path={"/"} text={"Informes y Registros"}/>
        </div>
    )
}