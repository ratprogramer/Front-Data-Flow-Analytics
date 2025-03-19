import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { CardPP_molecula } from "../../Moleculas/CardPP_molecula/CardPP_molecula"
import { useGetFetch } from "../../../../../helpers/useGetFetch"
import "./Pp_Registrados_organismo.css"
import { useThemeContext } from "../../../../../context/ThemeContext";

export function Pp_Registrados_organismo(){
    const { contextTheme } = useThemeContext();
    const [productos, setProductos] = useState([])
    const navigate = useNavigate();

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await useGetFetch("/producto/muestras_pp_incompletos", navigate);
                setProductos(response.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        fetchData();
    }, [])
    
    const formatFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString();
    };
    
    return(
        <div className="pp_registrados_container">
            { !productos ? <h1>No hay productos en proceso registrados</h1> :
                productos.map((producto, index) => (
                    <CardPP_molecula
                        key={index}
                        navRoute={"/ingreso_resultado_producto_p"}
                        nombreMuestra={producto.nombre_pp}
                        lote={producto.lote}
                        fechaAnalisis={formatFecha(producto.fecha_analisis)}
                        fecha24={producto.fecha_24h}
                        responsableAnalisis={producto.responsable_analisis}
                        id_pp={producto.id_pp}
                    />
                ))
            }
        </div>
    )
}