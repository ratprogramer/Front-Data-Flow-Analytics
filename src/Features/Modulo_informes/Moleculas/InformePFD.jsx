import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import './InformePDF.css'
import { FileDown } from "lucide-react";

const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 12 },
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
    const PDFDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 10 }}>
                    Informe de Productos Seleccionados
                </Text>
                <View style={styles.table}>
                    <View style={[styles.row, { backgroundColor: "#ddd" }]}>
                        <Text style={[styles.cellHeader, { width: "40%" }]}>Nombre</Text>
                        <Text style={[styles.cellHeader, { width: "30%" }]}>Fecha de Análisis</Text>
                        <Text style={[styles.cellHeader, { width: "30%" }]}>Lote</Text>
                    </View>
                    {selectedCards.map((card, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={[styles.cell, { width: "40%" }]}>{card.nombre_pp || card.sabor || "N/A"}</Text>
                            <Text style={[styles.cell, { width: "30%" }]}>{card.fecha_analisis}</Text>
                            <Text style={[styles.cell, { width: "30%" }]}>{card.lote}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    return (
        <>
            <PDFViewer style={{ width: "100%", height: "500px", border: "none" }}>
                <PDFDocument />
            </PDFViewer>

            {/* Este botón se podría eliminar, ya que la api de pdf de por sí incluye el botón de descarga*/}
            <PDFDownloadLink document={<PDFDocument />} fileName="informe_productos.pdf">
            {({ loading }) => (
              // 
              <button className="btnDscrgr">
                {loading ? "Generando PDF..." : <p><FileDown />Descargar Informe</p>}
              </button>
            )}
            </PDFDownloadLink>
        </>
    );
};
