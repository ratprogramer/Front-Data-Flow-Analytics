import { useNavigate } from "react-router-dom";
import "./CardPT_molecula.css";
import { useThemeContext } from "../../../../../context/ThemeContext";

export function CardPT_molecula({nombreMuestra, lote, fechaAnalisis, responsableAnalisis, id_PT, id_PP, navRoute, fecha24}){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(navRoute, {
            state: { id_PP, id_PT, nombreMuestra, lote }
        });
    }

    const { contextTheme } = useThemeContext();
    return(
        <>
            <div className={`card-pt-molecula-container ${fecha24 ? "pendiente" : "aprobado"}`}  onClick={handleClick} id={contextTheme}>
                <div className="data-pt-molecula">
                    <h1 className="nombre-muestra">{nombreMuestra}</h1>
                    <p>Lote: {lote}</p>
                    <p>Fecha de analisis: {fechaAnalisis}</p>   
                    <p>Responsable de analisis: {responsableAnalisis}</p>    
                </div>
            </div>
        </>
    )
}