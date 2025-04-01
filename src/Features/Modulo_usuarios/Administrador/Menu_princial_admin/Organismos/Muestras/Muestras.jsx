import "./Muestras.css";

const samplesList = [
  { id: 1, lote: "12345", name: "Productos en proceso", type: "PP", status: "Completada", date: "01/03/2025" },
  { id: 2, lote: "12345", name: "Productos terminados", type: "PT", status: "Completada", date: "02/03/2025" },
  { id: 3, lote: "12345", name: "Saborizaciones", type: "SB", status: "Completada", date: "02/03/2025" },
];

export const Muestras = () => {
  return (
    <div className="samples-content">
      <div className="samples-grid">
        {samplesList.map(({ id, lote, name, status, type, date }) => (
          <div className="sample-card" key={id}>
            <div className="sample-header">
              <h3>{name}</h3>
            </div>
            <div className="sample-details">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
