import "./DatosUsuario.css"

export function DatosUsuario({rol, nombre}){
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes inicia en 0, por lo que sumamos 1
    const dia = String(fecha.getDate()).padStart(2, "0");
    
    return(
        <div className="datosUsuario-container">
            <div className="datosUsuario">
                <h2>Microbiologa</h2>
                <h2>Julia R. Chalarca</h2>
                <h2><b>Fecha: </b>{año}-{mes}-{dia}</h2>
            </div>
            <div className="img-perfil-container">
                <img className="img-perfil" src="src\imgs\foto-perfil.png" alt="Foto Perfil" />
            </div>
        </div>
        /*
        <div className="datosUsuario-container">
            <div className="datosUsuario">
                <h1><b>Rol: </b>{rol}</h1>
                <h1><b>Nombre: </b>{nombre}</h1>
                <h1><b>Fecha: </b>{año}-{mes}-{dia}</h1>
            </div>
            <div className="img-perfil">
                <img src="" alt="" />
            </div>
        </div>
        */
    )
}