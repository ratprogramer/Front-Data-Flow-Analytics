import { useNavigate } from "react-router-dom";
import "./CardNotificacion.css";

export function CardNotificacion({
  nombreMuestra,
  lote,
  fechaAnalisis,
  responsableAnalisis,
  id,
  navRoute,
  fecha24
}) {
  if(fecha24){
    console.log("fecha24");
  }else{
    console.log("no fecha24");
  }
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(navRoute, {
      state: { id, nombreMuestra, lote },
    });
  };

  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString();
  };

  return (
    <>
      <div className={`card-pp-molecula-container ${fecha24 ? "pendiente" : "aprobado"}`} onClick={handleClick}>
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
