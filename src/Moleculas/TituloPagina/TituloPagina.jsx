import { useNavigate } from "react-router-dom"
import { UserOptions } from "../../Features/Modulo_usuarios/Analista/Vista_analistas/UserOptions/UserOptions";
import { BurgerMenu } from "../../Atomos/BurgerMenu/BurgerMenu";
import { useThemeContext } from "../../context/ThemeContext";
import "./TituloPagina.css"

export function TituloPagina({path, text }){
    const { contextTheme } = useThemeContext();

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path)
    }
    return(
        <div className="tituloPagina-container" id={contextTheme}>
            <div style={{display: 'flex', alignItems: 'center'}} id={contextTheme}>
                <BurgerMenu onclick={handleClick}/>
                <h1 className="titulo-modulo-txt">{text}</h1>
            </div>
            <UserOptions />
        </div>
    )
}