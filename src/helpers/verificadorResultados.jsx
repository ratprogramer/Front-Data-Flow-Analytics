import { usePostFetch } from "./usePostFetch"
import Swal from "sweetalert2";

export const  verificadorResultados = async (tipo, id, data, navigate) => {
    try{
        let dataFetch = {};
        const resultados = await usePostFetch(`/producto/obtenerResultadosId`, data, navigate);
        if(resultados.suceess){
            if (!resultados.result) {
                const {fecha_analisis, e_coli, coliformes, observaciones, cabina, medio_cultivo, responsable_analisis } = data;
                dataFetch = {e_coli, coliformes, observaciones, cabina, medio_cultivo, responsable_analisis };
                dataFetch["fecha_24h"] = fecha_analisis;
                dataFetch[`${tipo}`] = id;
                return {data: dataFetch, tipo: "24h"};
            }else{
                const {fecha_analisis, mohos_ley, observaciones, responsable_analisis} = data;
                dataFetch = {mohos_ley, observaciones, responsable_analisis};
                dataFetch["fecha_5d"] = fecha_analisis;
                dataFetch[`${tipo}`] = id;
                return {data: dataFetch, tipo: "5d"};
            }
        }else{
            Swal.fire("Error", "Error interno al registrar resultados", "error");
        }
    }catch(error){
        console.error("Error al verificar los resultados:", error);
    }
}