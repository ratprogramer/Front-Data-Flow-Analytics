import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import { CircleCheckBig, Filter, ArrowLeft } from "lucide-react";
import "./PrePrevisualizacion.css";

export function PrePrevisualizacion() {
  const navigate = useNavigate();
  const [shwFltrs, setShwFltrs] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [productType, setProductType] = useState("");
  const [loteFilter, setLoteFilter] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [nSlct, setNSlct] = useState(0);

  useEffect(() => {
    // luego aqui pongo el fetch cuando felipe acabe la ruta
    let cards = [
      { id_pp: 1, nombre_pp: "Bebida semi elaborada", fecha_analisis: "2025-03-04T05:00:00.000Z", lote: "BsFa98765" },
      { id_pp: 2, nombre_pp: "Bebida semi elaborada", fecha_analisis: "2025-02-20T05:00:00.000Z", lote: "BsFa54321" },
      { id_sb: 1, sabor: "Mora", fecha_analisis: "2025-02-10T05:00:00.000Z", lote: "MoT911111" },
      { id_pt: 7, nombre_pp: "Aguacate", fecha_analisis: "2025-02-15T05:00:00.000Z", lote: "BsFa12345" },
      { id_pt: 7, nombre_pp: "Aguacate", fecha_analisis: "2025-02-15T05:00:00.000Z", lote: "BsFa12345" },
      { id_pt: 7, nombre_pp: "Aguacate", fecha_analisis: "2025-02-15T05:00:00.000Z", lote: "BsFa12345" },
      { id_pt: 7, nombre_pp: "Aguacate", fecha_analisis: "2025-02-15T05:00:00.000Z", lote: "BsFa12345" },
      { id_pt: 7, nombre_pp: "Aguacate", fecha_analisis: "2025-02-15T05:00:00.000Z", lote: "BsFa12345" },
      { id_pt: 7, nombre_pp: "Aguacate", fecha_analisis: "2025-02-15T05:00:00.000Z", lote: "BsFa12345" },
    ];
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

  const handleNavigate = () => {
    if(selectedCards.length === 0){
      alert("Pendejo")
    }else{
      navigate("/informe", { state: { selectedCards } });
    }
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
      <div className="titulo" onClick={() => navigate("/menu_Derivado_lacteo_fermentado")}>
        <ArrowLeft className="bck" onClick={() => navigate("/menu_Derivado_lacteo_fermentado")}/>  
        <p className="tt">Informes y registros</p>
      </div>

      {!shwFltrs && (
        <button className="btnMenu" onClick={toggleFilters}>
          <Filter />
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
        <div className="conj">
          {getFilteredCards().map((card, index) => (
            <div className={`crd ${card.select ? "crdSlct" : ""}`}  key={index} onClick={(e) => handleSelect(index)}>
              <div className="info">
                <h3>{card.nombre_pp || card.sabor || "Error al cargar"} 
                  {card.select &&
                    <CircleCheckBig />
                  }
                </h3>
                <p>Fecha de análisis: <span className="sPan">{formatDateToDMY(card.fecha_analisis)}</span></p>
                <p>Lote: <span className="sPan">{card.lote}</span></p>
              </div>
            </div>
          ))}

        </div>
        <button className="btnSlct" onClick={handleNavigate}>Seleccionar</button>
      </div>
    </div>
  );
}



/*
import { useLocation } from "react-router-dom";

export function OtraVista() {
  const location = useLocation();
  const selectedCards = location.state?.selectedCards || []; // Accede a los datos

  return (
    <div>
      <h1>Resumen de Selección</h1>
      <ul>
        {selectedCards.map((card, index) => (
          <li key={index}>{card.nombre_pp || card.sabor} - Lote: {card.lote}</li>
        ))}
      </ul>
    </div>
  );
}

*/