import "./Boton.css";
export function Boton({type, text}){
    return(
        <button className="btn-atomo" type={type}>{text}</button>
    )
}