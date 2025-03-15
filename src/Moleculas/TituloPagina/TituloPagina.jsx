import { useNavigate } from "react-router-dom"
import "./TituloPagina.css"

export function TituloPagina({path, text }){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(path)
    }
    return(
        <div onClick={handleClick} className="tituloPagina-container">
            <h1 className="titulo-modulo-txt">{text}</h1>
        </div>
    )
}