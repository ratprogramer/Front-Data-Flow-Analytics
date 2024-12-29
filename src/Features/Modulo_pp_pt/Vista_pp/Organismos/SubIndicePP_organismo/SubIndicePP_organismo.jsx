import { BotonesIndice } from "../../../../../Moleculas/BotonesIndice/BotonesIndice";
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
export function SubIndicePP_organismo(){
    const botones = [{path:"/ingreso_producto_p", text:"Registrar producto"}, {path:"/productos_registrados_pp", text:"Ingresar resultado "}]
    return(
        <div className="Indice-container-organismo">
            <TituloPagina path={"/menu"} text={"Producto en proceso"}></TituloPagina>
            <BotonesIndice botones={botones}></BotonesIndice>
        </div>
    )
}