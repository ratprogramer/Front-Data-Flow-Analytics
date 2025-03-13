import { UserRound, CalendarFold, ChartLine } from "lucide-react";
import "./DatosAdmin.css"


export function DatosAdmin({rol, nombre}){
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes inicia en 0, por lo que sumamos 1
    const dia = String(fecha.getDate()).padStart(2, "0");
    
    return(
        <div className="datosUsuario-container">
            <div className="datosUsuario">
                <p><span><ChartLine /></span> Administrador</p>
                <p><span><UserRound /></span> El jefaso</p>
                <p><span><CalendarFold /></span> <span className="fecha">Fecha:</span> {año}-{mes}-{dia}</p>
            </div>
        </div>
    )
}