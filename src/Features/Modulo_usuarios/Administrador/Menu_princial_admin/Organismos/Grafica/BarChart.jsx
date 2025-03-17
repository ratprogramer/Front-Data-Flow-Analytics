import './BarChart.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const today = new Date();
const formattedDate = today.toLocaleDateString('es-ES');

const dataHoy = [
  { fecha: formattedDate, Completadas: 12, Totales: 14 }
];
// AQUI CAMBIA LOS COLORES DEL GRAFICO DE PASTEL
const COLORS = ["#e67e22", "#000000", "#27ae60"];
const dataPastel = [
  { name: "Producto en proceso", value: 5 },
  { name: "Producto terminado", value: 4 },
  { name: "Saborizacion", value: 3 }
]
const dataMes = [
  { fecha: "Semana 1", Completadas: 70 },
  { fecha: "Semana 2", Completadas: 68 },
  { fecha: "Semana 3", Completadas: 72 },
  { fecha: "Semana 4", Completadas: 0 }
];
const dataAño = [
  { fecha: "Enero", Completadas: 307 },
  { fecha: "Febrero", Completadas: 334  },
  { fecha: "Marzo", Completadas: 297 },
  { fecha: "Abril", Completadas: 240 },
  { fecha: "Mayo", Completadas: 0 },
  { fecha: "Junio", Completadas: 0 },
  { fecha: "Julio", Completadas: 0 },
  { fecha: "Agosto", Completadas: 0 },
  { fecha: "Septiembre", Completadas: 0 },
  { fecha: "Octubre", Completadas: 0 },
  { fecha: "Noviembre", Completadas: 0 },
  { fecha: "Diciembre", Completadas: 0 }
];

export const BarCharts = ({ filter }) => {
  
  return (
    <>
      {filter == 1 ? 
        (<>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataHoy}>
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              {/* AQUI CAMBIA EL GRUESO Y COLOR DE LAS BARRAS */}
              <Bar dataKey="Completadas" fill="green" barSize={200} />
              <Bar dataKey="Totales" fill="black" barSize={200} />
            </BarChart>
          </ResponsiveContainer>
          <PieChart width={500} height={500}>
            <Pie
              data={dataPastel}
              cx="50%"
              cy="50%"
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {dataPastel.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </>
        ): filter == 2 ? 
        (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataMes}>
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Completadas" fill="black" barSize={200} />
            </BarChart>
          </ResponsiveContainer>
        ) : filter == 3 ? 
        (
          <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataAño}>
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Completadas" fill="black" barSize={100} />
          </BarChart>
        </ResponsiveContainer>
        ):
        (
        <h1>Error al cargar el grafico, porfavor refresca la pestaña</h1>
        )
      }
    </>
  )
}