import "./Reportes.css";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { CircleCheckBig, Filter, FileDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import Swal from "sweetalert2";

import { useThemeContext } from "../../../../../../context/ThemeContext";
import { useGetFetch } from "../../../../../../helpers/useGetFetch";

const fechaActual = new Date().toISOString().split('T')[0];
const fileName = 'informe_productos_' + fechaActual + '.pdf'


const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 8 },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  row: { flexDirection: "row" },
  cellHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  cell: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  }
});



export const Reportes = () => {
  const [cards, setCards] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [loteFilter, setLoteFilter] = useState("");
  const [nSlct, setNSlct] = useState(0);
  const [productType, setProductType] = useState("");
  const [seleccionados, setSeleccionados] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [shwFltrs, setShwFltrs] = useState(false);
  const { contextTheme } = useThemeContext();
  const navigate = useNavigate();

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

const formatDateToDMY = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const renderTable = (title, data, headers, fields) => (
  <>
    <Text style={{ textAlign: "center", fontSize: 14, marginVertical: 10, fontWeight: "bold" }}>{title}</Text>
    <View style={styles.table}>
    <View style={[styles.row, { backgroundColor: "#ddd" }]}>
        {headers.map((header, index) => (
        <Text key={index} style={[styles.cellHeader, { width: `${100 / headers.length}%` }]}>
            {header}
        </Text>
        ))}
    </View>
    {data.map((item, index) => (
        <View key={index} style={styles.row}>
        {fields.map((field, idx) => (
            <Text key={idx} style={[styles.cell, { width: `${100 / headers.length}%` }]}>
            {item[field] || "N/A"}
            </Text>
        ))}
        </View>
    ))}
    </View>
  </>
);

const renderConformidadTable = (dataLength) => (
  <>
    <Text style={{ textAlign: "center", fontSize: 12, marginVertical: 10, fontWeight: "bold" }}>DECLARACIÓN DE CONFORMIDAD</Text>
    <View style={styles.table}>
      <View style={[styles.row, { backgroundColor: "#ddd" }]}>
        {["Análisis", "n", "c", "Número de muestras fuera de parámetros", "Concepto"].map((header, index) => (
        <Text key={index} style={[styles.cellHeader, { width: "20%" }]}>
            {header}
        </Text>
        ))}
      </View>
    {["Coliformes Totales", "Escherichia coli", "Mohos y Levaduras"].map((analysis, index) => (
      <View key={index} style={styles.row}>
      <Text style={[styles.cell, { width: "20%" }]}>{analysis}</Text>
      <Text style={[styles.cell, { width: "20%" }]}>{dataLength}</Text>
      <Text style={[styles.cell, { width: "20%" }]}>{[2, 0, 2][index]}</Text>
      <Text style={[styles.cell, { width: "20%" }]}>0</Text>
      <Text style={[styles.cell, { width: "20%" }]}>CUMPLE</Text>
      </View>
    ))}
    </View>
  </>
);

  const PDFDocument = ({ selectedCards }) => {
  const dataPP = selectedCards
      .filter(card => card.tipo === "PP")
      .map(card => ({
      ...card,
      fecha_analisis: formatDateToDMY(card.fecha_analisis),
      fecha_toma_muestra: formatDateToDMY(card.fecha_toma_muestra)
      }));

  const dataPT = selectedCards
      .filter(card => card.tipo === "PT")
      .map(card => ({
      ...card,
      fecha_analisis: formatDateToDMY(card.fecha_analisis),
      fecha_vencimiento: formatDateToDMY(card.fecha_vencimiento)
      }));

  const dataSB = selectedCards
      .filter(card => card.tipo === "SB")
      .map(card => ({
      ...card,
      fecha_analisis: formatDateToDMY(card.fecha_analisis),
      fecha_toma_muestra: formatDateToDMY(card.fecha_toma_muestra)
      }));

  return (
      <Document>
        {dataPP.length > 0 && (
            <Page size="A4" style={styles.page}>
            {renderTable("Producto Proceso (PP)", dataPP,
                ["Lote", "Fecha Análisis", "Nombre", "Punto de Muestra", "Fecha de Toma de Muestra", "Hora Toma de Muestra", "COLIFORMES TOTALES UFC / ml", "Mohos y Levaduras UFC / ml"],
                ["lote", "fecha_analisis", "nombre", "punto_muestra", "fecha_toma_muestra", "hora_toma_muestra", "coliformes", "mohos_ley"]
            )}
            {renderConformidadTable(dataPP.length)}
            </Page>
        )}
        
        {dataPT.length > 0 && (
            <Page size="A4" style={styles.page}>
            {renderTable("Producto Terminado (PT)", dataPT,
                ["Lote", "Fecha Análisis", "Referencia", "Presentación", "Punto de Muestra", "Fecha de Vencimiento", "Hora Empaque", "COLIFORMES TOTALES UFC / ml", "Mohos y Levaduras UFC / ml"],
                ["lote", "fecha_analisis", "ref", "presentacion", "maquina_envasadora", "fecha_vencimiento", "hora_empaque", "coliformes", "mohos_ley"]
            )}
            {renderConformidadTable(dataPT.length)}
            </Page>
        )}
        
        {dataSB.length > 0 && (
            <Page size="A4" style={styles.page}>
            {renderTable("Saborización (SB)", dataSB,
                ["Lote", "Fecha Análisis", "Sabor", "Tanque", "Fecha de Toma de Muestra", "Hora Toma de Muestra", "COLIFORMES TOTALES UFC / ml", "Mohos y Levaduras UFC / ml"],
                ["lote", "fecha_analisis", "nombre", "tanque", "fecha_toma_muestra", "hora_toma_muestra", "coliformes", "mohos_ley"]
            )}
            {renderConformidadTable(dataSB.length)}
            </Page>
        )}
      </Document>
    );
  };

  const handleNavigate = () => {
    if (!selectedCards.length) {
        Swal.fire("Error", "Debes seleccionar al menos una muestra para generar el informe", "error");
        return;
    }
  };

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
    <div className="filtros-admin" id={contextTheme}>
      {shwFltrs && (
        <div className="tabFilt-admin" ref={tabFiltRef} id={contextTheme}>
          <div className="fltr-admin">
            <p>Tipo</p>
            <select style={{cursor: "pointer"}} onChange={(e) => setProductType(e.target.value)} id={contextTheme}>
              <option value="all">Todos</option>
              <option value="pp">Producto en proceso</option>
              <option value="pt">Producto terminado</option>
              <option value="sb">Saborización</option>
            </select>
          </div>
          <hr />
          <div className="rfch-admin">
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
          <div className="lt-admin">
            <p>Lote:</p>
            <input 
              type="number" 
              className="lts-admin" 
              value={loteFilter} 
              placeholder="Ingrese Lote"
              onChange={(e) => setLoteFilter(e.target.value)} 
              id={contextTheme}
            />
          </div>
        </div>
      )}

      <div className="selected-admin" id={contextTheme}>
        <p className="slctP-admin" id={contextTheme}>
          <span className="slctP1-admin" id={contextTheme} onClick={() => setSeleccionados(!seleccionados)}>
            Seleccionados: <span className="slct-admin" id={contextTheme}>{nSlct}</span>
          </span>

          {!shwFltrs && <Filter className="btnMenu-admin" onClick={() => setShwFltrs(true)} />}
        </p>
        <div className="conj-admin">
          {getFilteredCards().map((card, index) => (
            <div
              className={`info-admin crd-admin ${card.select ? "crdSlct-admin" : ""}`}
              key={index}
              onClick={() => handleSelect(index)}
            >
              <div className={`info-admin ${card.select ? "crdSlct-admin" : ""}`}>
                <h3>{card.nombre || "Error al cargar"} {card.select && <CircleCheckBig />}</h3>
                <p>Fecha de análisis: <span className="sPan-admin">{new Date(card.fecha_analisis).toLocaleDateString("es-ES")}</span></p>
                <p>Lote: <span className="sPan-admin">{card.lote}</span></p>
              </div>
            </div>
          ))}
        </div>
        {selectedCards.length ? (
        <PDFDownloadLink document={<PDFDocument selectedCards={selectedCards} />} fileName={fileName}>
            {({ loading }) => (
            <button className="btnSlct-admin" id={contextTheme}>
                {loading ? "Generando PDF..." : "Descargar Informe"}
            </button>
            )}
        </PDFDownloadLink>
        ) : (
        <button className="btnSlct-admin" id={contextTheme} onClick={handleNavigate} style={{display: "none"}}>Descargar Informe</button>
        )}
      </div>
    </div>
);
}
