import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
import { DatosSB } from "../../Organismos/DatosSB/DatosSB";
import { FormularioResultadoSB_organismo } from "../../Organismos/FormularioResultadoSB_organismo/FormularioResultadoSB_organismo";
import './FormularioResultadoSB.css';
import { useThemeContext } from "../../../../../context/ThemeContext";

export function FormularioResultadoSB (){
    const { contextTheme } = useThemeContext();
    return(
        <div className="formularioResultadoPT-pagina-container" id={contextTheme}>
            <TituloPagina path={"/registrados_sb"} text={"Resultado"} />
            <DatosSB />
            <FormularioResultadoSB_organismo />
        </div>
    )
}