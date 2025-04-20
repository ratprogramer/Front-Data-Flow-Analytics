import "./PpSub.css";
import { useGetFetch } from "../../../../../../helpers/useGetFetch";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const PtSub = () => {
  const navigate = useNavigate();
  
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);


  useEffect(() => {
      (async () => {
        try {
          const response = await useGetFetch("/producto/producto_terminado", navigate);
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
      {cards.map((card) => (
          <div 
            className="sampleCardPp" 
            key={card.id_pt}
            onClick={() => setSelectedCard(card)}
          >
            <div className="sample-header">
              <h3>{card.nombre_pp}</h3>
            </div>
            <div className="sample-details">
              <p><strong>Lote:</strong> {card.lote}</p>
              <p><strong>Fecha de analisis:</strong> {formatDateToDMY(card.fecha_analisis)}</p>
              <p><strong>Analista:</strong> {card.nombre_analista}</p>
            </div>
          </div>
        ))}

      {selectedCard && (
        <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCard.nombre_pp}</h2>
            <p><strong>Referencia:</strong> {selectedCard.ref}</p>
            <p><strong>ID Producto en Proceso:</strong> {selectedCard.id_pp}</p>
            <p><strong>ID Producto Terminado:</strong> {selectedCard.id_pt}</p>
            <p><strong>Presentación:</strong> {selectedCard.presentacion}</p>
            <p><strong>Lote:</strong> {selectedCard.lote}</p>
            <p><strong>Fecha de análisis:</strong> {formatDateToDMY(selectedCard.fecha_analisis)}</p>
            <p><strong>Fecha de envío:</strong> {formatDateToDMY(selectedCard.fecha_env)}</p>
            <p><strong>Fecha de vencimiento:</strong> {formatDateToDMY(selectedCard.fecha_vencimiento)}</p>
            <p><strong>Hora de empaque:</strong> {selectedCard.hora_empaque}</p>
            <p><strong>Máquina envasadora:</strong> {selectedCard.maquina_envasadora}</p>
            <p><strong>Analista:</strong> {selectedCard.nombre_analista}</p>
            <p><strong>Observaciones:</strong> {selectedCard.observaciones}</p>
          </div>
        </div>
      )}
    </div>
  )
}
