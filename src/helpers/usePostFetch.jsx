
export async function usePostFetch(endPoint, data) {
  try {
    console.log(import.meta.env.VITE_DOMINIO + endPoint)
    const response = await fetch( "http://localhost:3001" + endPoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result || "Sin mensaje en la respuesta";
  } catch (error) {
    return `Error: ${error || "Error inesperado"}`;
  }
}
