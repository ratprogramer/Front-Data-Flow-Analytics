import { TxtGroup } from "../../../../../Moleculas/InputGroup/TxtGroup/TxtGroup";
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
import { DatosPP } from "../../Organismos/DatosPP/DatosPP";
import { FormularioResultadoPP_organismo } from "../../Organismos/FormularioResultadoPP_organismo/FormularioResultadoPP_organismo";
import "./FormularioResultadoPP.css";

export function FormularioResultadoPP() {
  return (
    <div className="formularioResultadoPP-pagina-container">
      <TituloPagina path={"/registrados_pp"} text={"Resultado"} />
      <DatosPP />
      <FormularioResultadoPP_organismo />
    </div>
  );
}
