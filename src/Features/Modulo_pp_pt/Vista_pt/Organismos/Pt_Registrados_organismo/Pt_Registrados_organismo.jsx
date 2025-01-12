import { CardPT_molecula } from "../../Moleculas/CardPT_molecula/CardPT_molecula" 
import { useEffect, useState } from "react"
import { useGetFetch } from "../../../../../helpers/useGetFetch"
import "./Pt_Registrados_organismo.css"

export function Pt_Registrados_organismo(){
    const [productos, setProductos] = useState([])
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await useGetFetch("/producto/producto_terminado_nom_pp");
                setProductos(response.result);
                console.log(response.result);
                
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
    }, [productos])

    const formatFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString(); // Formatea la fecha según la configuración local
    };

    return(
        <div className="pt_registrados_container">
            { 
                productos.map((producto, index) => (
                    <CardPT_molecula
                    key={index}
                    navRoute={"/ingreso_resultado_producto_t"}
                    nombreMuestra={producto.nombre_pp} // cambiarlo luego de cambios al back
                    lote={producto.lote}
                    fechaAnalisis={formatFecha(producto.fecha_analisis)}
                    responsableAnalisis={producto.responsable_analisis}
                    id={producto.id}
                    id_PP={producto.id_producto_proceso}
                />
                ))
            }
        </div>
    )
}