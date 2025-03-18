import { useNavigate } from "react-router-dom";
import "./CardPP_molecula.css";

export function CardPP_molecula({
  nombreMuestra,
  lote,
  fechaAnalisis,
  responsableAnalisis,
  id_pp,
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
      state: { id_pp, nombreMuestra, lote },
    });
  };

  const handleState = (estado) => {
    switch (estado) {
      case "aprobado":
        return "aprobado"; // Borde verde
      case "pendiente":
        return "pendiente"; // Borde amarillo
      default:
        return ""; // Sin borde específico
    }
  };
  
  return (
    <>
      <div className={`card-pp-molecula-container ${fecha24 ? "aprobado" : "pendiente"}`} onClick={handleClick}>
        <div className="data-pp-molecula">
          <p className="nombre-muestra">{nombreMuestra}</p>
          <p>Lote: <span>{lote}</span></p>
          <p>Fecha de análisis: <span>{fechaAnalisis}</span></p>
          <p>Responsable de análisis: <span>{responsableAnalisis}</span></p>
        </div>
      </div>
    </>
  );
}
