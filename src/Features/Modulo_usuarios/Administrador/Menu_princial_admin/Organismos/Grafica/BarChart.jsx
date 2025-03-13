import './BarChart.css'
export const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.flatMap((item) => [item.expected, item.completed]))

  return (
    <div className="simple-bar-chart">
      {data.map((item, index) => (
        <div className="chart-column" key={index}>
          <div className="bars-container">
            <div
              className="bar expected"
              style={{ height: `${(item.expected / maxValue) * 100}%` }}
              title={`Esperadas: ${item.expected}`}
            ></div>
            <div
              className="bar completed"
              style={{ height: `${(item.completed / maxValue) * 100}%` }}
              title={`Completadas: ${item.completed}`}
            ></div>
          </div>
          <div className="hour-label">{item.hour}</div>
        </div>
      ))}
    </div>
  )
}