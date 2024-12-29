import { BotonesIndice } from "../../../../Moleculas/BotonesIndice/BotonesIndice";
import { TituloPagina } from "../../../../Moleculas/TituloPagina/TituloPagina";
export function IndicePP_PT_organismo(){
    const botones = [{path:"/sub_menu_pp", text:"Producto en Proceso"}, {path:"", text:"Producto en Terminado"}]
    return(
        <div className="Indice-container-organismo">
            <TituloPagina path={"/menu"} text={"Derivado Lacteo Fermentado"}></TituloPagina>
            <BotonesIndice botones={botones}></BotonesIndice>
        </div>
    )
}