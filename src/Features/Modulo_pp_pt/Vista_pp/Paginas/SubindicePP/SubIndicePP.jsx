import { SubIndicePP_organismo } from "../../Organismos/SubIndicePP_organismo/SubIndicePP_organismo";
import { DatosUsuario } from "../../../../Modulo_menus/Organismos/DatosUsuario/DatosUsuario";
import './SubIndicePP.css'
export function SubIndicePP() {
  return (
    <div className="subCont">
      <SubIndicePP_organismo />
      <DatosUsuario />
    </div>
  );
}
