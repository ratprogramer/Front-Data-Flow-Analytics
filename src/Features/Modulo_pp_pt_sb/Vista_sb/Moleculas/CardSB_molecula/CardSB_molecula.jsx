import { useNavigate } from "react-router-dom";
import "./CardSB_molecula.css";
import { useThemeContext } from "../../../../../context/ThemeContext";

export function CardSB_molecula({sabor, lote, fechaAnalisis, responsableAnalisis, id_sb, navRoute, fecha24}){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(navRoute, {
            state: { id_sb, sabor, lote }
        });
    }

    const { contextTheme } = useThemeContext();
    return(
        <>
            <div className={`card-sb-molecula-container ${fecha24 ? "pendiente" : "aprobado"}`} onClick={handleClick} id={contextTheme}>
                <div className="data-sb-molecula" >
                    <h1 className="nombre-muestra-sb" id={contextTheme}>{sabor}</h1>
                    <p>Lote: <span>{lote}</span></p>
                    <p>Fecha de analisis: <span>{fechaAnalisis}</span></p>   
                    <p>Responsable de analisis: <span>{responsableAnalisis}</span></p>    
                </div>
            </div>
        </>
    )
}