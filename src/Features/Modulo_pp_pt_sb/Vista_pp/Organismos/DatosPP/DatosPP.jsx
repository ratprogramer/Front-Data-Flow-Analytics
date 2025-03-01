import "./DatosPP.css";
import { useLocation } from "react-router-dom";

export function DatosPP() {
  const location = useLocation();
  const { nombreMuestra, lote } = location.state || {};
  return (
    <div className="container-box-datos-pp">
      <div className="datosPP-organismo-container">
        <h1 className="datos-pp-txt">{nombreMuestra}</h1>
        <h1 className="datos-pp-txt">Lote: {lote}</h1>
      </div>
    </div>
  );
}
