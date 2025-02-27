import { SubIndiceSB_organismo } from '../../Organismos/SubIndiceSB_organismo/SubIndiceSB_organismo';
import { DatosUsuario } from "../../../../Modulo_menus/Organismos/DatosUsuario/DatosUsuario";
import './SubIndiceSB.css'
export function SubIndiceSB() {
  return (
    <div className="subCont">
      <SubIndiceSB_organismo />
      <DatosUsuario />
    </div>
  );
}
