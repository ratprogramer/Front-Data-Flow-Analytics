export async function usePostFetch(url, data) {
  try {
    const response = await fetch(url, {
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
