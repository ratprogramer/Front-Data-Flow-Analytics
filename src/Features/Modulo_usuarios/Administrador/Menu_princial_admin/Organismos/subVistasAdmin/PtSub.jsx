import "./PpSub.css";

export const PtSub = () => {

  const samplePtList = [
    { id: 1, lote: "12345", name: "Productos en proceso", type: "PT", status: "Completada", date: "01/03/2025" },
    { id: 2, lote: "12345", name: "Productos en proceso", type: "PT", status: "Completada", date: "02/03/2025" },
    { id: 3, lote: "12345", name: "Productos en proceso", type: "PT", status: "Completada", date: "02/03/2025" },
    { id: 4, lote: "12345", name: "Productos en proceso", type: "PT", status: "Completada", date: "01/03/2025" },
    { id: 5, lote: "12345", name: "Productos en proceso", type: "PT", status: "Completada", date: "02/03/2025" },
    { id: 6, lote: "12345", name: "Productos en proceso", type: "PT", status: "Completada", date: "02/03/2025" },
    { id: 7, lote: "12345", name: "Productos en proceso", type: "PT", status: "Completada", date: "01/03/2025" },
    { id: 8, lote: "12345", name: "Productos en proceso", type: "PT", status: "Completada", date: "02/03/2025" },
    { id: 9, lote: "12345", name: "Productos en proceso", type: "PT", status: "Completada", date: "02/03/2025" },
    { id: 10, lote: "12345", name: "Productos en proceso", type: "PT", status: "Completada", date: "01/03/2025" },
  ]
  return (
    <div className="ppSb">
      {
        samplePtList.map(({ id, lote, name, status, date }) => (
          <div className="sampleCardPp" key={id}>
            <div className="">
              <h3>{name}</h3>
              <span className={`sample-status ${status === "Completada" ? "completed" : "in-progress"}`}>
                {status}
              </span>
            </div>
            <div className="sample-details">
              <p><strong>Lote:</strong> {lote}</p>
              <p><strong>Fecha:</strong> {date}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
