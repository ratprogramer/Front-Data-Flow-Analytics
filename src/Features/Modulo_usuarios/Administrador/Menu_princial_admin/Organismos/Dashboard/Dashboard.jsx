import { BarChart } from "../../Organismos/Grafica/BarChart";
import { Icon } from "../../Organismos/IconList/Icon";
import "./Dashboard.css";

const chartData = [
  { hour: "8:00", expected: 12, completed: 10 },
  { hour: "10:00", expected: 18, completed: 15 },
  { hour: "12:00", expected: 15, completed: 16 },
  { hour: "14:00", expected: 20, completed: 18 },
  { hour: "16:00", expected: 24, completed: 19 },
  { hour: "18:00", expected: 10, completed: 8 },
];

export const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <h1>Dashboard General de Muestras</h1>
      <div className="summary-cards">
        {[{ title: "Total de muestras", value: 76, subtitle: "Hoy" },
          { title: "Muestras completadas", value: 64, subtitle: "84% del total", className: "green" },
          { title: "Muestras pendientes", value: 12, subtitle: "16% del total", className: "orange" }
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
          {["Hoy", "Este mes", "Histórico"].map((label, index) => (
            <button key={index} className={`filter-button ${index === 0 ? "active" : ""}`}>
              <Icon name="calendar" /> {label}
            </button>
          ))}
        </div>
        <div className="chart">
          <BarChart data={chartData} />
        </div>
      </div>
    </div>
  );
};
