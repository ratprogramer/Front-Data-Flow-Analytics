import { useNavigate } from "react-router-dom"
import "./TituloPagina.css"

export function TituloPagina({path, text }){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(path)
    }
    return(
        <div className="tituloPagina-container">
            <h1 className="titulo-modulo-txt">{text}</h1>
            <label className="burger" onClick={handleClick}>
                <input type="checkbox" id="burger" />
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    )
}