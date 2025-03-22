import { CircleCheckBig, Filter } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import Swal from "sweetalert2";

import { TituloPagina } from "../../../../Moleculas/TituloPagina/TituloPagina";
import { useThemeContext } from "../../../../context/ThemeContext";
import { useGetFetch } from "../../../../helpers/useGetFetch";
import "./PrePrevisualizacion.css";

export function PrePrevisualizacion() {
  const { contextTheme } = useThemeContext();
  const navigate = useNavigate();
  const [shwFltrs, setShwFltrs] = useState(false);
  const [seleccionados, setSeleccionados] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [productType, setProductType] = useState("");
  const [loteFilter, setLoteFilter] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [nSlct, setNSlct] = useState(0);

  const tabFiltRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await useGetFetch("/producto/resultados_5d", navigate);
        response.success
          ? setCards(response.data.map((card) => ({ ...card, select: false })))
          : Swal.fire("Error", "Error al traer las muestras", "error");
      } catch (error) {
        Swal.fire("Error", error, "error");
      }
    })();
  }, []);

  useEffect(() => {
    setNSlct(cards.filter((card) => card.select).length);
    setSelectedCards(cards.filter((card) => card.select));
  }, [cards]);

  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      if (shwFltrs) {
        const isInsideFilters = tabFiltRef.current?.contains(target);
        const isInsideFlatpickr = target.closest('.flatpickr-calendar');
        
        if (!isInsideFilters && !isInsideFlatpickr) {
          setShwFltrs(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shwFltrs]);

  const handleSelect = (index) => {
    setCards((prev) =>
      prev.map((card, i) => (i === index ? { ...card, select: !card.select } : card))
    );
  };

  const handleNavigate = () =>
    selectedCards.length ? navigate("/informe", { state: { selectedCards } }) : alert("Pendejo");

  const getFilteredCards = () => {
    return cards
      .filter((card) => !dateRange.length || (new Date(card.fecha_analisis) >= dateRange[0] && new Date(card.fecha_analisis) <= dateRange[1]))
      .filter((card) =>
        productType === "all" ? true :
        productType === "pp" ? card.tipo === "PP" :
        productType === "pt" ? card.tipo === "PT" :
        productType === "sb" ? card.tipo === "SB" : true
      )
      .filter((card) => !loteFilter.trim() || new RegExp(`^${loteFilter.replace(/\D/g, "")}`).test(card.lote.replace(/\D/g, "")))
      .filter((card) => !seleccionados || card.select);
  };

  return (
    <div className="filtros" id={contextTheme}>
      <TituloPagina path={"/menu"} text={"Informes y registros"} />


      {shwFltrs && (
        <div className="tabFilt" ref={tabFiltRef} id={contextTheme}>
          <div className="fltr">
            <p>Tipo</p>
            <select style={{cursor: "pointer"}} onChange={(e) => setProductType(e.target.value)} id={contextTheme}>
              <option value="all">Todos</option>
              <option value="pp">Producto en proceso</option>
              <option value="pt">Producto terminado</option>
              <option value="sb">Saborización</option>
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
                  onChange: (dates) => setDateRange(dates),
                  
                })
              }
              id={contextTheme}
            />
          </div>
          <hr />
          <div className="lt">
            <p>Lote:</p>
            <input 
              type="number" 
              className="lts" 
              value={loteFilter} 
              placeholder="Ingrese Lote"
              onChange={(e) => setLoteFilter(e.target.value)} 
              id={contextTheme}
            />
          </div>
        </div>
      )}

      <div className="selected" id={contextTheme}>
        <p className="slctP" id={contextTheme}>
          <span className="slctP1" id={contextTheme}>
            Seleccionados: <span className="slct" id={contextTheme} onClick={() => setSeleccionados(!seleccionados)}>{nSlct}</span>
          </span>

           
          {/* <span className="cicle-btn" idw={contextTheme} onClick={() => setSeleccionados(!seleccionados)}>
            Seleccionados
            <CircleCheckBig
              style={{ color: "green", alignSelf: "center", cursor: "pointer" }} 
            />
          </span > */}


          {/* {!shwFltrs && <button className="btnMenu" onClick={() => setShwFltrs(true)}><Filter /></button>} */}
          {!shwFltrs && <Filter className="btnMenu" onClick={() => setShwFltrs(true)} />}
        </p>
        <div className="conj">
          {getFilteredCards().map((card, index) => (
            <div
              className={`info crd ${card.select ? "crdSlct" : ""}`}
              key={index}
              onClick={() => handleSelect(index)}
            >
              <div className={`info ${card.select ? "crdSlct" : ""}`}>
                <h3>{card.nombre || "Error al cargar"} {card.select && <CircleCheckBig />}</h3>
                <p>Fecha de análisis: <span className="sPan">{new Date(card.fecha_analisis).toLocaleDateString("es-ES")}</span></p>
                <p>Lote: <span className="sPan">{card.lote}</span></p>
              </div>
            </div>
          ))}
        </div>
        <button className="btnSlct" id={contextTheme} onClick={handleNavigate}>Generar informe</button>
      </div>
    </div>
  );
}
