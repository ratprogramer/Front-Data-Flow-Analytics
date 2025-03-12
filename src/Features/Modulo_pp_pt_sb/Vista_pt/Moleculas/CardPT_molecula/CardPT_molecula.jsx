import { useNavigate } from "react-router-dom";
import "./CardPT_molecula.css";

export function CardPT_molecula({nombreMuestra, lote, fechaAnalisis, responsableAnalisis, id_PT, id_PP, navRoute}){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(navRoute, {
            state: { id_PP, id_PT, nombreMuestra, lote }
        });
    }
    return(
        <>
            <div className="card-pt-molecula-container" onClick={handleClick}>
                <div className="data-pt-molecula">
                    <h1 className="nombre-muestra">{nombreMuestra}</h1>
                    <p>Lote: {lote}</p>
                    <p>Fecha de analisis: {fechaAnalisis}</p>   
                    <p>Responsable de analisis: {responsableAnalisis}</p>    
                </div>
                <div className="card-pt-estado">
                    <img className="estado-img-pt" src="src\imgs\estado1.png" alt="" />
                </div>
            </div>
        </>
    )
}