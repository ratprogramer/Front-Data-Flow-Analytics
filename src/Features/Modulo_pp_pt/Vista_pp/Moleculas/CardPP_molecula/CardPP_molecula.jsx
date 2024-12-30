import { useNavigate } from "react-router-dom";
import "./CardPP_molecula.css";

export function CardPP_molecula({nombreMuestra, lote, fechaAnalisis, responsableAnalisis, id}){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/ingreso_resultado_producto_p", {
            state: { id }
        });
    }
    return(
        <>
            <div className="card-pp-molecula-container">
                <div className="data-pp-molecula">
                    <h1>{nombreMuestra}</h1>
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