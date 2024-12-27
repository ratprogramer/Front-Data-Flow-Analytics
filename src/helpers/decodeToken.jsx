

export function decodeToken(token) {
    const [header, payload, last] = token.split(".");
    if (!payload) {
      throw new Error("Token no válido");
    }
    return JSON.parse(atob(payload));
}
