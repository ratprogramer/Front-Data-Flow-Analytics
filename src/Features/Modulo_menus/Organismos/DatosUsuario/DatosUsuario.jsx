import { UserRound, CalendarFold, ChartLine, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DatosUsuario.css"


export function DatosUsuario({rol, nombre}){

    const navigate = useNavigate();

    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes inicia en 0, por lo que sumamos 1
    const dia = String(fecha.getDate()).padStart(2, "0");
    
    return(
        <div className="datosUsuario-container">
            <div className="datosUsuario">
                <p><span><ChartLine /></span>Analista</p>
                <p><span><UserRound /></span>Nombre Random</p>
                <p><span><CalendarFold /></span><span className="fecha">Fecha:</span> {año}-{mes}-{dia}</p>
                
                <p className="logOut" onClick={() => navigate("/")}>
                    <span>
                        <LogOut/>
                    </span>
                    Log Out
                </p>
            </div>
        </div>
    )
}