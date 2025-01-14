import { CardPP_molecula } from "../../../Vista_pp/Moleculas/CardPP_molecula/CardPP_molecula" 
import { useEffect, useState } from "react"
import { useGetFetch } from "../../../../../helpers/useGetFetch"

export function PP_Registrados_prePT_organismo(){
    const [productos, setProductos] = useState([])
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await useGetFetch("/producto/producto_proceso");
                setProductos(response.result);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };
        fetchData();
    }, [])


    const formatFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString(); // Formatea la fecha según la configuración local
    };

    return(
        <div className="pp_registrados_container">
            { !productos ? <h1>No hay productos en proceso registrados</h1> :
                productos.map((producto, index) => (
                    <CardPP_molecula
                    key={index}
                    navRoute={"/ingreso_producto_t"}
                    nombreMuestra={producto.nombre_pp}
                    lote={producto.lote}
                    fechaAnalisis={formatFecha(producto.fecha_analisis)}
                    responsableAnalisis={producto.responsable_analisis}
                    id={producto.id}
                />
                ))
            }
        </div>
    )
}