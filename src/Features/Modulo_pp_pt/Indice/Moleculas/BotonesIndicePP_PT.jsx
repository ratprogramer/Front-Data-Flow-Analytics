import { Boton } from "../../../../Atomos/Boton/Boton";
import "./BotonesIndicePP_PT.css"

export function BotonesIndicePP_PT(){
    return(
        <div className="botones-indicepp_pt-container">
            <Boton path={"/ingreso_producto_p"} text={"Producto en Proceso"}></Boton>
            <Boton path={""} text={"Producto en Terminado"}></Boton>
        </div>
    )
}