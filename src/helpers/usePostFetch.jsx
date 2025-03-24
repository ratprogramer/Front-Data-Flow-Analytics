import Swal from "sweetalert2";
export async function usePostFetch(endPoint, data, navigate, token = true, method = "POST") {
  try {
    let response;
    const tokenUser = sessionStorage.getItem('token');
    if(token){
      response = await fetch( import.meta.env.VITE_DOMINIO + endPoint, {
        method: method,
        headers: {  
          Authorization: `Bearer ${tokenUser}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(data),
        
      });
    }else{
      
      response = await fetch( import.meta.env.VITE_DOMINIO + endPoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    
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
    Swal.fire("Error", error, "error");
    console.log(error);
    
  }
}
