import { useLocation } from "react-router-dom";
import "./DatosPP.css";

export function DatosPP() {
  const location = useLocation();
  const { nombreMuestra, lote } = location.state || {};
  return (
    <div className="container-box-datos-pp">
      <div className="datosPP-organismo-container">
        <p className="ttPp">{nombreMuestra}</p>
        <p>Lote: {lote}</p>
      </div>
    </div>
  );
}
