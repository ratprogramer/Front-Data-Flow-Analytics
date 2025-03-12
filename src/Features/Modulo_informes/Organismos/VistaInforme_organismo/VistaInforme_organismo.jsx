import { useLocation } from "react-router-dom";
import { InformePDF } from "../../Moleculas/InformePFD";
import "./VistaInforme_organismo.css";

export const VistaInforme_organismo = () => {
    const location = useLocation();
    const selectedCards = location.state?.selectedCards || [];

    return (
        <div className="informe-container">
            {selectedCards.length > 0 ? (
                <InformePDF selectedCards={selectedCards} />
            ) : (
                <p>No hay productos seleccionados.</p>
            )}
        </div>
    );
}
