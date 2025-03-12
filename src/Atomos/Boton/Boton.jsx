import "./Boton.css";
import { useNavigate } from "react-router-dom";

export function Boton({path, text, icon}){
    const navigate = useNavigate();
    
    const handleNavigate =() =>{
        navigate(path)
    }
    return(
        <button className="btn-atomo" onClick={handleNavigate}>
            <span>{icon}</span>
            <b>{text}</b>
        </button>
    )
}