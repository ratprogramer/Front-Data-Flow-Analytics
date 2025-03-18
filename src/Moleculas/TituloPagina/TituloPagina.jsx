import { useNavigate } from "react-router-dom"

import { UserOptions } from "../../Features/Modulo_usuarios/Analista/Vista_analistas/UserOptions/UserOptions";
import { BurgerMenu } from "../../Atomos/BurgerMenu/BurgerMenu";
import "./TituloPagina.css"

export function TituloPagina({path, text }){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(path)
    }
    return(
        <div className="tituloPagina-container">
            <div style={{display: 'flex', alignItems: 'center'}}>
            <BurgerMenu onclick={handleClick}/>
            <h1 className="titulo-modulo-txt">{text}</h1>
            </div>
            <UserOptions />
        </div>
    )
}