export async function useGetFetch(endPoint) {
    try {
        const response = await fetch(import.meta.env.VITE_DOMINIO + endPoint, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        return result || "Sin mensaje en la respuesta";
    } catch (error) {
        return `Error: ${error || "Error inesperado"}`;
    }
}