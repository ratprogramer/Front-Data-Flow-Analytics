import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import './InformePDF.css';
import { FileDown } from "lucide-react";

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

export const InformePDF = ({ selectedCards }) => {
    const formatDateToDMY = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";
        
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        console.log(`${day}/${month}/${year}`);
        
        return `${day}/${month}/${year}`;
    };


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


    const PDFDocument = () => (
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
    
    return (
        <>
            <PDFViewer style={{ width: "100%", height: "500px", border: "none" }}>
                <PDFDocument />
            </PDFViewer>
    
            <PDFDownloadLink document={<PDFDocument />} fileName="informe_productos.pdf">
                {({ loading }) => (
                    <button className="btnDscrgr">
                        {loading ? "Generando PDF..." : <p><FileDown />Descargar Informe</p>}
                    </button>
                )}
            </PDFDownloadLink>
        </>
    );
}