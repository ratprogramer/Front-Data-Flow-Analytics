import { useNavigate } from "react-router-dom";
import "./CardNotificacion.css";
import { useThemeContext } from "../../context/ThemeContext";

export function CardNotificacion({
  nombreMuestra,
  lote,
  fechaAnalisis,
  responsableAnalisis,
  id,
  navRoute,
  fecha24,
  tipo
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    if(tipo == "sb"){
      navigate(navRoute, {
        state: { id_sb: id, nombreMuestra, lote },
      });  
    }else if(tipo == "pt"){
      navigate(navRoute, {
        state: { id_PT: id, nombreMuestra, lote },
      });
    }else{
      navigate(navRoute, {
        state: { id_pp: id, nombreMuestra, lote },
      });
    }
  };

  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString();
  };

  const { contextTheme } = useThemeContext();

  return (
    <>
      <div className={`card-pp-molecula-container ${fecha24 != "Fecha 24" ? "pendiente" : "aprobado"}`} onClick={handleClick} id={contextTheme}>
        <div className="data-pp-molecula">
          <p className="nombre-muestra">{nombreMuestra}</p>
          <p>Lote: <span>{lote}</span></p>
          <p>Fecha de análisis: <span>{formatFecha(fechaAnalisis)}</span></p>
          <p>Responsable de análisis: <span>{responsableAnalisis}</span></p>
        </div>
      </div>
    </>
  );
}
