import dotenv from "dotenv";
dotenv.config();

export async function usePostFetch(endPoint, data) {
  try {
    const response = await fetch(process.env.DOMINIO + endPoint, {
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
