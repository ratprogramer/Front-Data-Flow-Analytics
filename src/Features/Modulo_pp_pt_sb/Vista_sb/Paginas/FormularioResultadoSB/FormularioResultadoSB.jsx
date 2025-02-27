import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
import { DatosSB } from "../../Organismos/DatosSB/DatosSB";
import { FormularioResultadoSB_organismo } from "../../Organismos/FormularioResultadoSB_organismo/FormularioResultadoSB_organismo";
import './FormularioResultadoSB.css';
export function FormularioResultadoSB (){
    return(
        <div className="formularioResultadoPT-pagina-container">
            <TituloPagina path={"/registrados_sb"} text={"Resultado"}></TituloPagina>
            <DatosSB></DatosSB>
            <FormularioResultadoSB_organismo></FormularioResultadoSB_organismo>
        </div>
    )
}