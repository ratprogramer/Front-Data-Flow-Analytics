import "./PpSub.css";
import { useGetFetch } from "../../../../../../helpers/useGetFetch";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const SbSub = () => {
  const navigate = useNavigate();
  
  const [cards, setCards] = useState([]);
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
          cards.map(({ id_sb, lote, sabor, fecha_analisis, nombre_analista }) => (
          <div className="sampleCardPp" key={id_sb}>
            <div className="">
              <h3>{sabor}</h3>
            </div>
            <div className="sample-details">
              <p><strong>Lote:</strong> {lote}</p>
              <p><strong>Fecha de analisis:</strong> {formatDateToDMY(fecha_analisis)}</p>
              <p><strong>Analista:</strong> {nombre_analista}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
