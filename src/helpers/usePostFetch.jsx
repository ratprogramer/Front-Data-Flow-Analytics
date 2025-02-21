
export async function usePostFetch(endPoint, data, token = undefined) {
  try {
    let response;
    if(token){
      response = await fetch( "http://localhost:3001" + endPoint, {
        method: "POST",
        headers: {  
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(data),
      });
    }else{
      
      response = await fetch( "http://localhost:3001" + endPoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    
    const result = await response.json();

    return result || "Sin mensaje en la respuesta";
  } catch (error) {
    Swal.fire("Error", "Error interno del servidor", "error");
  }
}
