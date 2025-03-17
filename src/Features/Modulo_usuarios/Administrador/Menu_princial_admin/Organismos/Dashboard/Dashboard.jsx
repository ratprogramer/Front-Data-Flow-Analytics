import { BarCharts } from "../../Organismos/Grafica/BarChart";
import { Icon } from "../../Organismos/IconList/Icon";
import { useState } from "react";
import "./Dashboard.css";

export const Dashboard = () => {

  const [filter, setFilter] = useState(1);
  return (
    <div className="dashboard-content">
      <h1>Dashboard General de Muestras</h1>
      <div className="summary-cards">
        {[{ title: "Total de muestras", value: 14, subtitle: "Hoy" },
          { title: "Muestras completadas", value: 12, subtitle: "84% del total", className: "green" },
          { title: "Muestras pendientes", value: 2, subtitle: "16% del total", className: "orange" }
        ].map(({ title, value, subtitle, className = "" }, index) => (
          <div className="card" key={index}>
            <h3>{title}</h3>
            <div className={`card-value ${className}`}>{value}</div>
            <div className="card-subtitle">{subtitle}</div>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <h2>Estadísticas de Muestras</h2>
        <p>Comparativa entre muestras esperadas y realizadas</p>
        <div className="chart-filters">
        <button className={`filter-button ${filter === 1 ? "active" : ""}`} onClick={() => setFilter(1)}>
              <Icon name="calendar" /> Hoy
        </button>
        <button className={`filter-button ${filter === 2  ? "active" : ""}`} onClick={() => setFilter(2)}>
              <Icon name="calendar" /> Este mes            
        </button>
        <button className={`filter-button ${filter === 3  ? "active" : ""}`} onClick={() => setFilter(3)}>
              <Icon name="calendar" /> Este año
        </button>
        </div>
        <div className="chart">
          <BarCharts filter={filter} />
        </div>
      </div>
    </div>
  );
};
