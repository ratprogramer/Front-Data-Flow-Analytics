import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
import { DatosPT } from "../../Organismos/DatosPT/DatosPT";
import { FormularioResultadoPT_organismo } from "../../Organismos/FormularioResultadoPT_organismo/FormularioResultadoPT_organismo";
import './FormularioResultadoPT.css';

export function FormularioResultadoPT (){
    return(
        <div className="formularioResultadoPT-pagina-container">
            <TituloPagina path={"/productos_registrados_pt"} text={"Resultado"} />
            <DatosPT />
            <FormularioResultadoPT_organismo />
        </div>
    )
}