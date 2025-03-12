import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { useState } from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

import "./VistaInforme_organismo.css"

export function VistaInforme_organismo(){
    const location = useLocation();
    const [selectedCards, setSelectedCards] = useState([]);
    useEffect(() => {
        const selectedCard = location.state?.selectedCards || [];
        setSelectedCards(selectedCard);
    }, [])


    
    return(
        <div>
            <h1>ola</h1>
        </div>
    )
}