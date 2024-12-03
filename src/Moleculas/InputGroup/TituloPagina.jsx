import { useNavigate } from "react-router-dom"
import "./TituloPagina.css"

export function TituloPagina({path, text }){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(path)
    }
    return(
        <div onClick={handleClick} className="tituloPagina-container">
            <img className="flecha-img" src="src\imgs\flecha-derecha.png"></img>
            <h1 className="titulo-modulo-txt">{text}</h1>
        </div>
    )
}