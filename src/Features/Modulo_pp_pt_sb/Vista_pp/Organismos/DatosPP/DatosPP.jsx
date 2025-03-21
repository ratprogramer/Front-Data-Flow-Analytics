import { useLocation } from "react-router-dom";
import "./DatosPP.css";
import { useThemeContext } from "../../../../../context/ThemeContext";


export function DatosPP() {
  const contextTheme = useThemeContext();
  const location = useLocation();
  const { nombreMuestra, lote } = location.state || {};
  return (
    <div className="container-box-datos-pp" id={contextTheme}>
      <div className="datosPP-organismo-container" id={contextTheme}>
        <p className="ttPp" id={contextTheme}>{nombreMuestra}</p>
        <p>Lote: {lote}</p>
      </div>
    </div>
  );
}
