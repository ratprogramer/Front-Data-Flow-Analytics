import { useState, useEffect } from "react";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import "./PrePrevisualizacion.css";

export function PrePrevisualizacion() {
  const [shwFltrs, setShwFltrs] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [productType, setProductType] = useState("");
  const [loteFilter, setLoteFilter] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [nSlct, setNSlct] = useState(0);

  useEffect(() => {
    // luego aqui pongo el fetch cuando felipe acabe la ruta
    let cards = [{ id_pp: 1, nombre_pp: "Bebida semi elaborada", fecha_analisis: "2025-03-04T05:00:00.000Z", lote: "BsFa98765" },
    { id_pp: 2, nombre_pp: "Bebida semi elaborada", fecha_analisis: "2025-02-20T05:00:00.000Z", lote: "BsFa54321" },
    { id_sb: 1, sabor: "Mora", fecha_analisis: "2025-02-10T05:00:00.000Z", lote: "MoT911111" },
    { id_pt: 7, nombre_pp: "Aguacate", fecha_analisis: "2025-02-15T05:00:00.000Z", lote: "BsFa12345" }];
    const cardsWithSelect = cards.map((card) => ({ ...card, select: false }));
    setCards(cardsWithSelect)
    ;

    
  }, []);

  useEffect(() => {
    setNSlct(cards.filter((card) => card.select).length);
    setSelectedCards(cards.filter((card) => card.select));
  }, [cards]);

  const handleSelect = (index) => {
    setCards(prev => 
      prev.map((card, i) => 
        i == index ? {...card, select: !card.select} : card
      )
    )
  };

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


  const getFilteredCards = () => {
    let filteredCards = cards;

    if (dateRange.length === 2) {
      const [start, end] = dateRange;
      filteredCards = filteredCards.filter((card) => {
        const cardDate = new Date(card.fecha_analisis);
        return cardDate >= start && cardDate <= end;
      });
    }

    if (productType) {
      filteredCards = filteredCards.filter((card) => {
        if (productType === "all") return true;
        if (productType === "pp") return card.id_pp !== undefined;
        if (productType === "pt") return card.id_pt !== undefined;
        if (productType === "sb") return card.id_sb !== undefined;
        return true;
      });
    }

    if (loteFilter.trim() !== "") {
      const search = loteFilter.replace(/\D/g, ""); 
      filteredCards = filteredCards.filter((card) => {
        const cardNumbers = card.lote.replace(/\D/g, ""); 
        const regex = new RegExp(`^${search}`);
        return regex.test(cardNumbers);
      });
    }
    
    return filteredCards;
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
        <button className="btnMenu" onClick={toggleFilters}>
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
            <select name="tipo" onChange={(e) => setProductType(e.target.value)}>
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
                el &&
                flatpickr(el, {
                  mode: "range",
                  dateFormat: "Y-m-d",
                  locale: { rangeSeparator: " a " },
                  maxDate: "today",
                  onChange: (selectedDates) => setDateRange(selectedDates),
                })
              }
            />
          </div>

          <hr />
          <div className="lt">
            <p>Lote</p>
            <input 
              type="text" 
              name="lote" 
              id="lt" 
              value={loteFilter}
              onChange={(e) => setLoteFilter(e.target.value)}
            />
          </div>

          <button className="btnX" onClick={toggleFilters}>
            X
          </button>
        </div>
      )}

      <div className="selected">
        <p className="slctP">
          seleccionados: <span className="slct">{nSlct}</span>
        </p>
        {getFilteredCards().map((card, index) => (
          <div className={`crd ${card.select ? "crdSlct" : ""}`}  key={index} onClick={(e) => handleSelect(index)}>
            <div className="info">
              <h3>{card.nombre_pp || card.sabor || "Error al cargar"} 
                {card.select &&
                  <span>
                    <svg  
                      width="28"  
                      height="28"  
                      viewBox="0 0 24 24"  
                      fill="none"  
                      stroke="currentColor"  
                      strokeWidth="2"  
                      strokeLinecap="round"  
                      strokeLinejoin="round"  
                      >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M9 12l2 2l4 -4" />
                      </svg>
                </span>
                }
              </h3>
              <p>Fecha de análisis: <span className="sPan">{formatDateToDMY(card.fecha_analisis)}</span></p>
              <p>Lote: <span className="sPan">{card.lote}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
