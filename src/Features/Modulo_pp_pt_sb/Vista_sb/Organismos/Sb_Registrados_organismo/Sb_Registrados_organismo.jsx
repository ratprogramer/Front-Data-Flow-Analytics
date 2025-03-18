import { CardSB_molecula } from "../../Moleculas/CardSB_molecula/CardSB_molecula"
import { useEffect, useState } from "react"
import { useGetFetch } from "../../../../../helpers/useGetFetch"
import { useNavigate } from "react-router-dom"
import "./Sb_Registrados_organismo.css"

export function Sb_Registrados_organismo(){
    const [productos, setProductos] = useState([])
    const navigate = useNavigate();
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await useGetFetch("/producto/muestras_sb_incompletos", navigate);
                console.log(response.data);
                
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
        <div className="sb_registrados_container">
            { !productos ? <h1>No hay muestras de saborizacion registradas</h1> :
                productos.map((producto, index) => (
                    <CardSB_molecula
                    key={index}
                    navRoute={"/ingreso_resultado_sb"}
                    sabor={producto.sabor}
                    lote={producto.lote}
                    fecha24={producto.fecha_24h}
                    fechaAnalisis={formatFecha(producto.fecha_analisis)}
                    responsableAnalisis={producto.responsable_analisis}
                    id_sb={producto.id_sb}
                />
                ))
            }
        </div>
    )
}