import { BotonesIndicePP_PT } from "../Moleculas/BotonesIndicePP_PT";
import { TituloPagina } from "../../../../Moleculas/InputGroup/TituloPagina";

export function IndicePP_PT_organismo(){
    return(
        <div className="Indice-container-organismo">
            <TituloPagina path={"/menu"} text={"Derivado Lacteo Fermentado"}></TituloPagina>
            <BotonesIndicePP_PT></BotonesIndicePP_PT>
        </div>
    )
}