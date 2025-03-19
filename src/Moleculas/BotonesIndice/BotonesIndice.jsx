import { Boton } from "../../Atomos/Boton/Boton";
// import "./BotonesIndice.css"
import { useThemeContext } from "../../context/ThemeContext";

export function BotonesIndice({ botones }){
    const { contextTheme } = useThemeContext();

    return(
        <div className="botones-indicepp_menu-container" id={contextTheme}>
            {botones.map((boton, index) => (
                <Boton key={index} path={boton.path} text={boton.text} icon={boton.icon} id={contextTheme}/>
            ))}
        </div>
    )
}