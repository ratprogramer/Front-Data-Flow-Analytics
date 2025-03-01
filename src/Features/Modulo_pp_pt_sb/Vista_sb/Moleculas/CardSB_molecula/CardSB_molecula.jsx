import { useNavigate } from "react-router-dom";
import "./CardSB_molecula.css";

export function CardSB_molecula({sabor, lote, fechaAnalisis, responsableAnalisis, id, navRoute}){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(navRoute, {
            state: { id, sabor, lote }
        });
    }
    return(
        <>
            <div className="card-sb-molecula-container" onClick={handleClick}>
                <div className="data-pp-molecula">
                    <h1 className="nombre-muestra">{sabor}</h1>
                    <p>Lote: {lote}</p>
                    <p>Fecha de analisis: {fechaAnalisis}</p>   
                    <p>Responsable de analisis: {responsableAnalisis}</p>    
                </div>
                <div className="card-pp-estado">
                    <img className="estado-img-pp" src="src\imgs\estado1.png" alt="" />
                </div>
            </div>
        </>
    )
}