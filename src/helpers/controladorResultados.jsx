import { usePostFetch } from "./usePostFetch"
import Swal from "sweetalert2";

export const  controladorResultados = async (tipo, id, data, navigate, post = true) => {
    try{
        let dataFetch = {};
        const resultados = await usePostFetch(`/producto/obtenerResultadosId`, data, navigate);
        if(resultados.success){
            if (!resultados.result) {
                const {fecha_analisis, e_coli, coliformes, observaciones, cabina, medio_cultivo, responsable_analisis } = data;
                dataFetch = {e_coli, coliformes, observaciones, cabina, medio_cultivo};
                dataFetch["fecha_24h"] = fecha_analisis;
                dataFetch[`${tipo}`] = id;
                dataFetch["responsable_analisis_24"] = responsable_analisis;
                return {dataFetch: dataFetch, tipo: "24h"};
            }else{
                const {fecha_analisis, mohos_ley, observaciones, responsable_analisis} = data;
                dataFetch = {mohos_ley, observaciones};
                dataFetch["fecha_5d"] = fecha_analisis;
                dataFetch[`${tipo}`] = id;
                dataFetch["responsable_analisis_5"] = responsable_analisis;
                
                return {dataFetch: dataFetch, tipo: "5d", data: resultados.result[0]};
            }
            
        }else{
            Swal.fire("Error", "Error interno al registrar resultados", "error");
        }
    }catch(error){
        console.error("Error al verificar los resultados:", error);
    }
}