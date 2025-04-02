import "./Reportes.css";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import { CircleCheckBig, Filter, FileDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import Swal from "sweetalert2";

import { useThemeContext } from "../../../../../../context/ThemeContext";
import { useGetFetch } from "../../../../../../helpers/useGetFetch";

import logo from "../../../../../../imgs/logo_letras_negro.png" 

const fechaActual = new Date().toISOString().split('T')[0];
const fileName = 'informe_productos_' + fechaActual + '.pdf'


const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 8 },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#4bacc6",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  table2: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#4f81bd",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  row: { flexDirection: "row" },
  cellHeader: {
    borderColor: "#4bacc6",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    // backgroundColor: "#f2f2f2",
    backgroundColor: "#b7dde8",
    fontWeight: "bold",
  },
  cellHeader2: {
    borderColor: "#4f81bd",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: "#4f81bd",
    fontWeight: "bold",
  }
  ,
  cell: {
    borderColor: "#4bacc6",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  cell2: {

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
      <Text style={{ textAlign: "center", fontSize: 14, padding: 4 , marginVertical: 7, fontWeight: "bold", backgroundColor: "#4bacc6" }}>{title}</Text>
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
      <Text style={{ textAlign: "center", fontSize: 12, padding: 4, marginVertical: 7, fontWeight: "bold", backgroundColor: "#4f81bd" }}>DECLARACIÓN DE CONFORMIDAD</Text>
      <View style={styles.table2}>
        <View style={[styles.row, { backgroundColor: "#ddd" }]}>
          {["Análisis", "n", "c", "Número de muestras fuera de parámetros", "Concepto"].map((header, index) => (
          <Text key={index} style={[styles.cellHeader2, { width: "20%" }]}>
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

  const PDFDocument = ({ selectedCards, logoSrc }) => {
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
  
    const renderPageContent = (title, data, headers, fields) => (
      <View style={styles.pageContent}>
        {renderTable(title, data, headers, fields)}
        {renderConformidadTable(data.length)}
      </View>
    );
  
    const renderFooter = () => (
      <View style={styles.footer}>
        <View>
          <Text style={{ fontSize: 10, fontWeight: "bold", textDecoration: "underline", marginBottom: "10px" }}>REFERENCIAS</Text>
          <Text style={{ fontSize: 10, fontWeight: "bold", textDecoration: "underline", marginBottom: "15px" }}>Valores de Referencia</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Coliformes totales: </Text>
            <Text>-10 UFC CUMPLE, (10-100 UFC) CUMPLE PARCIALMENTE n=2</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>E. coli: </Text>
            <Text>-10UFC CUMPLE</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Mohos y Levaduras: </Text>
            <Text>-200 UFC CUMPLE (200-500 UFC) CUMPLE PARCIALMENTE n=2</Text>
          </View>
  
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text>• Los límites contra los que se evalúa el producto, son según Resolución 1407 de 2022. Numeral 1.11 - Leche fermentada. </Text>
            <Text>• El producto analizado cumple con los parámetros establecidos.</Text>
          </View>
        </View>
        <Text style={styles.footerText}>Fecha de impresión: {formatDateToDMY(new Date())}</Text>
        <Text>_____________________________________________</Text>
      </View>
    );
  
    return (
      <Document>
        {dataPP.length > 0 && (
          <Page size="A4" style={styles.page}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "50px" }}>
              <View>
                <Text style={{ fontSize: 16, color: "gray", fontWeight: "bold", fontFamily: "Times-Roman" }}>INFORME DE RESULTADOS</Text>
                <Text style={{ fontSize: 16, color: "gray", fontWeight: "bold", fontFamily: "Times-Roman" }}>LABORATORIO DE MICROBIOLOGÍA</Text>
              </View>
              <View>
                <Image style={{ width: "100px", height: "100px", marginRight: "10px" }} src={logoSrc} />
              </View>
            </View>
            {renderPageContent("Producto Proceso (PP)", dataPP, 
              ["Lote", "Fecha Análisis", "Nombre", "Punto de Muestra", "Fecha de Toma de Muestra", "Hora Toma de Muestra", "COLIFORMES TOTALES UFC / ml", "Mohos y Levaduras UFC / ml"], 
              ["lote", "fecha_analisis", "nombre", "punto_muestra", "fecha_toma_muestra", "hora_toma_muestra", "coliformes", "mohos_ley"])}
            <View style={{ flexGrow: 1 }} /> {/* This ensures the footer is pushed to the bottom */}
            {renderFooter()}
          </Page>
        )}
  
        {dataPT.length > 0 && (
          <Page size="A4" style={styles.page}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "50px" }}>
              <View>
                <Text style={{ fontSize: 16, color: "gray", fontWeight: "bold", fontFamily: "Times-Roman" }}>INFORME DE RESULTADOS</Text>
                <Text style={{ fontSize: 16, color: "gray", fontWeight: "bold", fontFamily: "Times-Roman" }}>LABORATORIO DE MICROBIOLOGÍA</Text>
              </View>
              <View>
                <Image style={{ width: "100px", height: "100px", marginRight: "10px" }} src={logoSrc} />
              </View>
            </View>
            {renderPageContent("Producto Terminado (PT)", dataPT,
              ["Lote", "Fecha Análisis", "Referencia", "Presentación", "Punto de Muestra", "Fecha de Vencimiento", "Hora Empaque", "COLIFORMES TOTALES UFC / ml", "Mohos y Levaduras UFC / ml"], 
              ["lote", "fecha_analisis", "ref", "presentacion", "maquina_envasadora", "fecha_vencimiento", "hora_empaque", "coliformes", "mohos_ley"])}
            <View style={{ flexGrow: 1 }} /> {/* This ensures the footer is pushed to the bottom */}
            {renderFooter()}
          </Page>
        )}
  
        {dataSB.length > 0 && (
          <Page size="A4" style={styles.page}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "50px" }}>
              <View>
                <Text style={{ fontSize: 16, color: "gray", fontWeight: "bold", fontFamily: "Times-Roman" }}>INFORME DE RESULTADOS</Text>
                <Text style={{ fontSize: 16, color: "gray", fontWeight: "bold", fontFamily: "Times-Roman" }}>LABORATORIO DE MICROBIOLOGÍA</Text>
              </View>
              <View>
                <Image style={{ width: "100px", height: "100px", marginRight: "10px" }} src={logoSrc} />
              </View>
            </View>
            {renderPageContent("Saborización (SB)", dataSB,
              ["Lote", "Fecha Análisis", "Sabor", "Tanque", "Fecha de Toma de Muestra", "Hora Toma de Muestra", "COLIFORMES TOTALES UFC / ml", "Mohos y Levaduras UFC / ml"], 
              ["lote", "fecha_analisis", "nombre", "tanque", "fecha_toma_muestra", "hora_toma_muestra", "coliformes", "mohos_ley"])}
            <View style={{ flexGrow: 1 }} /> {/* This ensures the footer is pushed to the bottom */}
            {renderFooter()}
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
        <PDFDownloadLink document={<PDFDocument selectedCards={selectedCards} logoSrc={logo} />} fileName={fileName}>
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
