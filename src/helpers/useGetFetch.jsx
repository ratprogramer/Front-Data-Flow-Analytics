import Swal from "sweetalert2";
export async function useGetFetch(endPoint, navigate) {
    try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(import.meta.env.VITE_DOMINIO + endPoint, {
            method: "GET",
            headers: {  
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" 
            },
        });
        console.log(response);
        
        const result = await response.json();
        
        if(result.tokenExpirado){
            navigate("/")
            Swal.fire(
                "Error",
                result.message,
                "error"
            );
        }
        return result || "Sin mensaje en la respuesta";
    } catch (error) {
        console.log(error);
        Swal.fire("Error", "Error interno del servidor", "error");
    }
}