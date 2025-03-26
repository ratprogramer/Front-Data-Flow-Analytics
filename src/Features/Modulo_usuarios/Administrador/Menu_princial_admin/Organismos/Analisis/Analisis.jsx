import "./Analisis.css";

const analysisList = [
  { id: 1, name: "Resultado PP", samples: 12, status: "Completado", date: "01/03/2025" },
  { id: 2, name: "Resultado PT", samples: 8, status: "En proceso", date: "02/03/2025" },
  { id: 3, name: "Resultado Sb", samples: 5, status: "Pendiente", date: "03/03/2025" },
  { id: 4, name: "Resultados generales", samples: 25, status: "Completado", date: "03/03/2025" },
];

export const Analisis = () => {
  return (
    <div className="analysis-content">
      <div className="analysis-grid">
        {analysisList.map(({ id, name, status, samples, date }) => (
          <div className="analysis-card" key={id}>
            <div className="analysis-header">
              <h3>{name}</h3>
              <span
                className={`analysis-status ${
                  status === "Completado"
                    ? "completed"
                    : status === "En proceso"
                    ? "in-progress"
                    : "pending"
                }`}
              >
                {status}
              </span>
            </div>
            <div className="analysis-details">
              <p><strong>Muestras:</strong> {samples}</p>
              <p><strong>Fecha:</strong> {date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
