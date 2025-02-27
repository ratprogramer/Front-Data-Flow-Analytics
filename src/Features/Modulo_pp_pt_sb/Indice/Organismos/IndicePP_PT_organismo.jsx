import { BotonesIndice } from "../../../../Moleculas/BotonesIndice/BotonesIndice";
import { TituloPagina } from "../../../../Moleculas/TituloPagina/TituloPagina";
import './IndicePP_PT_organismo.css'
export function IndicePP_PT_organismo(){
    const botones = [{path:"/sub_menu_pp", text:"Producto en Proceso"}, {path:"/sub_menu_sb", text:"Saborizacion"}, {path:"/sub_menu_pt", text:"Producto Terminado"}]
    return(
        <div className="Indice-container-organismo">
            <TituloPagina path={"/menu"} text={"Derivado Lacteo Fermentado"} />
            <BotonesIndice botones={botones} />
        </div>
    )
}