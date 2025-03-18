import { useNavigate } from "react-router-dom";
import "./CardSB_molecula.css";

export function CardSB_molecula({sabor, lote, fechaAnalisis, responsableAnalisis, id_sb, navRoute, fecha24}){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(navRoute, {
            state: { id_sb, sabor, lote }
        });
    }
    return(
        <>
            <div className={`card-sb-molecula-container ${fecha24 ? "aprobado" : "pendiente"}`} onClick={handleClick}>
                <div className="data-sb-molecula">
                    <h1 className="nombre-muestra-sb">{sabor}</h1>
                    <p>Lote: <span>{lote}</span></p>
                    <p>Fecha de analisis: <span>{fechaAnalisis}</span></p>   
                    <p>Responsable de analisis: <span>{responsableAnalisis}</span></p>    
                </div>
            </div>
        </>
    )
}