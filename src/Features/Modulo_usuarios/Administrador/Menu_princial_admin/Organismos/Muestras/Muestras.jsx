import "./Muestras.css";

const samplesList = [
  { id: 1, lote: "12345", name: "Muestra PP", type: "PP", status: "Completada", date: "01/03/2025" },
  { id: 2, lote: "12345", name: "Muestra PT", type: "PT", status: "Pendiente", date: "02/03/2025" },
  { id: 3, lote: "12345", name: "Muestra SB", type: "SB", status: "Completada", date: "02/03/2025" },
  { id: 4, lote: "12345", name: "Muestra PP5", type: "PP", status: "Completada", date: "03/03/2025" },
  { id: 5, lote: "12345", name: "Muestra PT5", type: "PT", status: "Pendiente", date: "03/03/2025" },
  { id: 6, lote: "12345", name: "Muestra SB5", type: "SB", status: "Completada", date: "03/03/2025" },
];

export const Muestras = () => {
  return (
    <div className="samples-content">
      <div className="samples-grid">
        {samplesList.map(({ id, lote, name, status, type, date }) => (
          <div className="sample-card" key={id}>
            <div className="sample-header">
              <h3>{name}</h3>
              <span className={`sample-status ${status === "Completada" ? "completed" : "pending"}`}>
                {status}
              </span>
            </div>
            <div className="sample-details">
              <p><strong>Tipo:</strong> {type}</p>
              <p><strong>Fecha:</strong> {date}</p>
              <p><strong>Lote:</strong> {lote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
