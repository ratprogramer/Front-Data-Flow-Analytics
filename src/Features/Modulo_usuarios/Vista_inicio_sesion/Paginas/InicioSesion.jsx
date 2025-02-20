import {LoginForm} from "./../Organismos/LoginForm.jsx"
import "./InicioSesion.css"

export function InicioSesion(){
    return(
        <div className="inicioSesion-pagina">
            <h1 className="titulo">Bienvenido</h1>
            <LoginForm/>
            <img src="src\imgs\LogoNormal2.png" />
        </div>
    )
}