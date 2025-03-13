import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina"
import { Formulario_Registro_Usuario } from "../Organismos/Formulario_Registro_Usuario/Formulario_Registro_Usuario"

export function Registro_Usuario_Pagina () {
    return(
        <>
            <TituloPagina path={"/menu_admin"} text={"Registro"} />
            <Formulario_Registro_Usuario />
        </>
    )
}