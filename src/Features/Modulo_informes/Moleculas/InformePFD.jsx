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
borderBottomWidth: 0
},
row: { flexDirection: "row" },
cellHeader: {
borderStyle: "solid",
borderWidth: 1,
borderLeftWidth: 0,
borderTopWidth: 0,
padding: 5,
backgroundColor: "#f2f2f2",
fontWeight: "bold"
},
cell: {
borderStyle: "solid",
borderWidth: 1,
borderLeftWidth: 0,
borderTopWidth: 0,
padding: 5
}
});

export const InformePDF = ({ selectedCards }) => {
    const dataPP = selectedCards.filter(card => card.tipo === "PP");
    const dataPT = selectedCards.filter(card => card.tipo === "PT");
    const dataSB = selectedCards.filter(card => card.tipo === "SB");

    const renderTable = (title, data, headers, fields) => (
        <>
            <Text style={{ textAlign: "center", fontSize: 14, marginVertical: 10, fontWeight: "bold" }}>
                {title}
            </Text>
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
    
    const PDFDocument = () => (
        <Document>
            {dataPP.length > 0 && (
                <Page size="A4" style={styles.page}>
                    {renderTable("Producto Proceso (PP)", dataPP,
                        ["Lote", "Fecha Análisis", "Nombre", "Punto de Muestra", "Fecha de Toma de Muestra", "Hora Toma de Muestra", "COLIFORMES TOTALES UFC / ml", "Mohos y Levaduras UFC / ml"],
                        ["lote", "fecha_analisis", "nombre", "punto_muestra", "fecha_toma_muestra", "hora_toma_muestra", "coliformes", "mohos_ley"]
                    )}
                </Page>
            )}
    
            {dataPT.length > 0 && (
                <Page size="A4" style={styles.page}>
                    {renderTable("Producto Terminado (PT)", dataPT,
                        ["Lote", "Fecha Análisis", "Referencia", "Presentación", "Punto de Muestra", "Fecha de Vencimiento", "Hora Empaque", "COLIFORMES TOTALES UFC / ml", "Mohos y Levaduras UFC / ml"],
                        ["lote", "fecha_analisis", "ref", "presentacion", "maquina_envasadora", "fecha_vencimiento", "hora_empaque", "coliformes", "mohos_ley"]
                    )}
                </Page>
            )}
    
            {dataSB.length > 0 && (
                <Page size="A4" style={styles.page}>
                    {renderTable("Saborización (SB)", dataSB,
                        ["Lote", "Fecha Análisis", "Sabor", "Tanque", "Fecha de Toma de Muestra", "Hora Toma de Muestra", "COLIFORMES TOTALES UFC / ml", "Mohos y Levaduras UFC / ml"],
                        ["lote", "fecha_analisis", "nombre", "tanque", "fecha_toma_muestra", "hora_toma_muestra", "coliformes", "mohos_ley"]
                    )}
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