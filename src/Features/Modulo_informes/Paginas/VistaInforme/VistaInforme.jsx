// import { VistaInforme_organismo } from "../../Organismos/VistaInforme_organismo/VistaInforme_organismo"
import { InformePDF } from "../../Moleculas/InformePFD"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./VistaInforme.css"
import { ArrowLeft } from "lucide-react";


export function VistaInforme(){
    const location = useLocation();
    const selectedCards = location.state?.selectedCards || [];
    const navigate = useNavigate();


    return(
        <div className="ej">
            <div className="bck" onClick={() => navigate("/seleccion_muestras")}>
                <ArrowLeft onClick={() => navigate("/seleccion_muestras")}/>
                <h1>Informe</h1>
            </div>

            {/* Silencié el componente 'VistaInforme_organismo' por que no considero necesario otro componente, 
            si usted considera que sí es necesario, relax, modifiquelo*/}

            {/* <VistaInforme_organismo /> */}
            {selectedCards && (
                <InformePDF selectedCards={selectedCards} />
            )}
        </div>
    )
}