import { useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import "./PrePrevisualizacion.css";

export function PrePrevisualizacion() {
  const [shwFltrs, setShwFltrs] = useState(false);
  const [dateRange, setDateRange] = useState([]); 

  const toggleFilters = () => setShwFltrs((prev) => !prev);

  const formatDateToDMY = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const cards = [
    {
        id: 1,
        nombre_pp: "Bebida semi elaborada",
        fecha_analisis: "2025-03-04T05:00:00.000Z",
        fecha_toma_muestra: "2025-03-04T05:00:00.000Z",
        hora_toma_muestra: "23:38:00",
        lote: "BsFa23248",
        punto_muestra: "Fabricación",
        punto_alterno: null,
        observaciones: "wqe",
        responsable_analisis: 1
    },
    {
        id: 2,
        nombre_pp: "Bebida semi elaborada",
        fecha_analisis: "2025-03-05T05:00:00.000Z",
        fecha_toma_muestra: "2025-03-01T05:00:00.000Z",
        hora_toma_muestra: "20:25:00",
        lote: "BsFa11111",
        punto_muestra: "Fabricación",
        punto_alterno: null,
        observaciones: "popis",
        responsable_analisis: 1
    },
    {
        id: 3,
        nombre_pp: "Bebida semi elaborada",
        fecha_analisis: "2025-03-05T05:00:00.000Z",
        fecha_toma_muestra: "2025-03-05T05:00:00.000Z",
        hora_toma_muestra: "19:29:00",
        lote: "BsFa22222",
        punto_muestra: "Fabricación",
        punto_alterno: null,
        observaciones: "",
        responsable_analisis: 1
    },
    {
        id: 4,
        nombre_pp: "Corte de bebida lactea",
        fecha_analisis: "2025-03-05T05:00:00.000Z",
        fecha_toma_muestra: "2025-03-03T05:00:00.000Z",
        hora_toma_muestra: "22:26:00",
        lote: "CbT933333",
        punto_muestra: "Tanque 9",
        punto_alterno: null,
        observaciones: "",
        responsable_analisis: 1
    },
    {
        id: 5,
        nombre_pp: "Corte de bebida lactea",
        fecha_analisis: "2025-03-05T05:00:00.000Z",
        fecha_toma_muestra: "2025-03-03T05:00:00.000Z",
        hora_toma_muestra: "19:28:00",
        lote: "CbT1044444",
        punto_muestra: "Tanque 10",
        punto_alterno: null,
        observaciones: "",
        responsable_analisis: 1
    },
    {
        id: 6,
        nombre_pp: "Bebida semi elaborada",
        fecha_analisis: "2025-03-05T05:00:00.000Z",
        fecha_toma_muestra: "2025-03-03T05:00:00.000Z",
        hora_toma_muestra: "08:27:00",
        lote: "BsFa55555",
        punto_muestra: "Fabricación",
        punto_alterno: null,
        observaciones: "",
        responsable_analisis: 1
    },
    {
        id: 7,
        nombre_pp: "Bebida semi elaborada",
        fecha_analisis: "2025-03-05T05:00:00.000Z",
        fecha_toma_muestra: "2025-03-03T05:00:00.000Z",
        hora_toma_muestra: "19:45:00",
        lote: "BsFa11111",
        punto_muestra: "Fabricación",
        punto_alterno: null,
        observaciones: "",
        responsable_analisis: 1
    },
    {
      id: 1,
      sabor: "Mora",
      fecha_analisis: "2025-03-05T05:00:00.000Z",
      fecha_toma_muestra: "2025-03-03T05:00:00.000Z",
      hora_toma_muestra: "19:30:00",
      tanque: "Tanque 9",
      lote: "MoT911111",
      observaciones: "",
      responsable_analisis: 1
  },
];
const getFilteredCards = () => {
  // Si no hay dos fechas seleccionadas, mostramos todo
  if (dateRange.length < 2) {
    return cards;
  }

  // Obtén la fecha de inicio y fin
  const [start, end] = dateRange;
  
  // Filtra el arreglo original
  return cards.filter((card) => {
    const cardDate = new Date(card.fecha_analisis);

    // Compara si la fecha del card está dentro del rango
    return cardDate >= start && cardDate <= end;
  });
};
  return (
    <div className="filtros">
      <div className="titulo">
        <svg
          className="lftArr"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
        <p className="tt">Informes y registros</p>
      </div>

      {!shwFltrs && (
        <button onClick={toggleFilters}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </button>
      )}

      {shwFltrs && (
        <div className="tabFilt">
          <div className="fltr">
            <p>Filtros</p>
            <select name="tipo">
              <option value="mpp">Producto en proceso</option>
              <option value="mpt">Producto terminado</option>
              <option value="rpp">Saborización</option>
            </select>
          </div>

          <hr />

          <div className="rfch">
            <p>Rango de fechas</p>
            <input
              type="text"
              placeholder="Seleccionar rango de fechas"
              ref={(el) =>
                el && flatpickr(el, { mode: "range", dateFormat: "Y-m-d", maxDate: "today", onChange: (selectedDates) => {setDateRange(selectedDates)}})
              }
            />
          </div>

          <hr />
          <div className="lt">
            <p>Lote</p>
            <input type="number" name="lote" id="lt" />
          </div>

          <button onClick={toggleFilters}>X</button>
        </div>
      )}

      <div className="selected">
        <p>
          seleccionados: <span>{3}</span>
        </p>
        {/* 3. Usar la función de formateo en el map */}
        {getFilteredCards().map((card) => {
  const fechaAnalisisFormateada = formatDateToDMY(card.fecha_analisis);
  return (
    <div className="crd" key={card.id}>
      <div className="sup"></div>
      <div className="info">
        {card.nombre_pp ? (
          <h3>{card.nombre_pp}</h3>
        ) : card.sabor ? (
          <h3>{card.sabor}</h3>
        ) : (
          <h3>Error al cargar la muestra :c</h3>
        )}
        <p>{fechaAnalisisFormateada}</p>
        <p>{card.lote}</p>
      </div>
    </div>
  );
})}
      </div>
    </div>
  );
}
