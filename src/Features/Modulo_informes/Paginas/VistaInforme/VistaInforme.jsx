// import { VistaInforme_organismo } from "../../Organismos/VistaInforme_organismo/VistaInforme_organismo"
import { InformePDF } from "../../Moleculas/InformePFD"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./VistaInforme.css"
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";


export function VistaInforme(){
    const location = useLocation();
    const [selectedCards, setSelectedCards] = useState([]);
    useEffect(() => {
        const selectedCards = location.state?.selectedCards || [];
        setSelectedCards(selectedCards);
    }, []);
    const navigate = useNavigate();


    return(
        <div className="ej">
            <div className="bck" onClick={() => navigate("/seleccion_muestras")}>
                <ArrowLeft onClick={() => navigate("/seleccion_muestras")}/>
                <h1>Informe</h1>
            </div>
            {selectedCards && (
                <InformePDF selectedCards={selectedCards} />
            )}
        </div>
    )
}