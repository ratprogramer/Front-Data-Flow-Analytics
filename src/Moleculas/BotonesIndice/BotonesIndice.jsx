import { Boton } from "../../Atomos/Boton/Boton";
// import "./BotonesIndice.css"

export function BotonesIndice({ botones }){
    return(
        <div className="botones-indicepp_menu-container">
            {botones.map((boton, index) => (
            <Boton key={index} path={boton.path} text={boton.text} icon={boton.icon}/>
            ))}
        </div>
    )
}