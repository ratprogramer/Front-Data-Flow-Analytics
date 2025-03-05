import { useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";

import "./PrePrevisualizacion.css";

export function PrePrevisualizacion() {
  const [shwFltrs, setShwFltrs] = useState(false);

  const toggleFilters = () => setShwFltrs((prev) => !prev);

  const cards = [
    { id: 1, name: "card1", type: "pp" },
    { id: 2, name: "card2", type: "pp" },
    { id: 3, name: "card3", type: "pt" },
    { id: 4, name: "card4", type: "pt" },
    { id: 5, name: "card5", type: "rpp" },
    { id: 6, name: "card6", type: "rpt" },
  ];

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
              <option value="mpp">Muestra PP</option>
              <option value="mpt">Muestra PT</option>
              <option value="rpp">Resultado PP</option>
              <option value="rpt">Resultado PT</option>
            </select>
          </div>

          <hr />

          <div className="rfch">
            <p>Rango de fechas</p>
            <input
              type="text"
              placeholder="Seleccionar rango de fechas"
              ref={(el) =>
                el && flatpickr(el, { mode: "range", dateFormat: "Y-m-d" })
              }
            />
          </div>

          <hr />
          <div className="lt">
            <p>Lote</p>
            <input type="number" name="lote" id="lt" />
          </div>

          <button
            onClick={toggleFilters}
          >
            X
          </button>
        </div>
      )}

      <div className="selected">
        <p>
          seleccionados: <span>{3}</span>
        </p>
        {cards.map((card, index) => (
          <div className="crd" key={index}>
            <div className="sup"></div>
            <div className="info">
              <h3>{card.name}</h3>
              <p>{card.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
