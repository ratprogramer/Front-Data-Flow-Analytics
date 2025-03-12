import { BotonesIndice } from "../../../../../Moleculas/BotonesIndice/BotonesIndice";
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
import { FilePlus, FileChartColumn } from 'lucide-react';

export function SubIndicePT_organismo(){
    const botones = [
        {path:"/productos_registrados_pp_", text:"Registrar producto", icon:<FilePlus />}, 
        {path:"/productos_registrados_pt", text:"Ingresar resultado", icon:<FileChartColumn />}
    ]
    return(
        <div className="Indice-container-organismo">
            <TituloPagina path={"/menu_Derivado_lacteo_fermentado"} text={"Producto terminado"}></TituloPagina>
            <BotonesIndice botones={botones}></BotonesIndice>
        </div>
    )
}