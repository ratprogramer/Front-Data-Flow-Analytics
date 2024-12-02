import "./Boton.css";
import { useNavigate } from "react-router-dom";

export function Boton({path, text}){
    const navigate = useNavigate();
    
    const handleNavigate =() =>{
        navigate(path)
    }
    return(
        <button className="btn-atomo" onClick={handleNavigate}><b>{text}</b></button>
    )
}