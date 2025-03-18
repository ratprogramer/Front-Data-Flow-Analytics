import { CardPT_molecula } from "../../Moleculas/CardPT_molecula/CardPT_molecula" 
import { useEffect, useState } from "react"
import { useGetFetch } from "../../../../../helpers/useGetFetch"
import { useNavigate } from "react-router-dom"
import "./Pt_Registrados_organismo.css"

export function Pt_Registrados_organismo(){
    const [productos, setProductos] = useState([])
    const navigate = useNavigate()
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await useGetFetch("/producto/muestras_pt_incompletos", navigate);
                if(response.tokenExpirado){
                    navigate("/")
                    Swal.fire(
                        "Error",
                        response.message,
                        "error"
                    );
                }
                console.log(response.data) 
                setProductos(response.data);
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
        return fecha.toLocaleDateString();
    };

    return(
        <div className="pt_registrados_container">
            { !productos ? <h1>No hay productos en proceso registrados</h1> :
                productos.map((producto, index) => (
                    <CardPT_molecula
                    key={index}
                    navRoute={"/ingreso_resultado_producto_t"}
                    nombreMuestra={producto.nombre_pp} 
                    lote={producto.lote}
                    fechaAnalisis={formatFecha(producto.fecha_analisis)}
                    responsableAnalisis={producto.responsable_analisis}
                    fecha24={producto.fecha_24h}
                    id_PT={producto.id_pt}
                    id_PP={producto.id_producto_proceso}
                />
                ))
            }
        </div>
    )
}