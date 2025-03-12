import "./DatosUsuario.css"

export function DatosUsuario({rol, nombre}){
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes inicia en 0, por lo que sumamos 1
    const dia = String(fecha.getDate()).padStart(2, "0");
    
    return(
        <div className="datosUsuario-container">
            <div className="datosUsuario">
                <p>Microbiologa</p>
                <p>Julia R. Chalarca</p>
                <p><span>Fecha:</span> {año}-{mes}-{dia}</p>
            </div>
            <div className="img-perfil-container">
                <img className="img-perfil" src="src\imgs\foto-perfil.png" alt="Foto Perfil" />
            </div>
        </div>
    )
}