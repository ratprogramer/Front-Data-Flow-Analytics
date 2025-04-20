import "./PpSub.css";
import { useGetFetch } from "../../../../../../helpers/useGetFetch";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const SbSub = () => {
  const navigate = useNavigate();
  
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
      (async () => {
        try {
          const response = await useGetFetch("/producto/saborizacion", navigate);
          response.success
            ? setCards(response.result)
            : Swal.fire("Error", "Error al traer las muestras", "error");
        } catch (error) {
          Swal.fire("Error", error, "error");
        }
      })();
  }, []);
  
  const formatDateToDMY = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  
  return (
    <div className="ppSb">
      {
          cards.map((card) => (
          <div 
            className="sampleCardPp" 
            key={card.id_sb}
            onClick={() => setSelectedCard(card)}
          >
            <div className="">
              <h3>{card.sabor}</h3>
            </div>
            <div className="sample-details">
              <p><strong>Lote:</strong> {card.lote}</p>
              <p><strong>Fecha de analisis:</strong> {formatDateToDMY(card.fecha_analisis)}</p>
              <p><strong>Analista:</strong> {card.nombre_analista}</p>
            </div>
          </div>
        ))
      }

      {selectedCard && (
        <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCard.sabor}</h2>
            <p><strong>Lote:</strong> {selectedCard.lote}</p>
            <p><strong>Fecha de análisis:</strong> {formatDateToDMY(selectedCard.fecha_analisis)}</p>
            <p><strong>Fecha toma de muestra:</strong> {formatDateToDMY(selectedCard.fecha_toma_muestra)}</p>
            <p><strong>Hora toma de muestra:</strong> {selectedCard.hora_toma_muestra}</p>
            <p><strong>Analista:</strong> {selectedCard.nombre_analista}</p>
            <p><strong>Tanque:</strong> {selectedCard.tanque}</p>
            <p><strong>Observaciones:</strong> {selectedCard.observaciones}</p>
          </div>
        </div>
      )}

    </div>
  )
}
