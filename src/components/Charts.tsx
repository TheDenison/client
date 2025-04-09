import React from "react";

import "/src/styles/Charts.css";

const charts = [
  {
    id: 1,
    name: "Fact Orders",
    title: "FactOrders",
    src: "http://11.222.333.444:8088/superset/explore/p/GBDvyqovnO6/?standalone=1&height=400",
  },
  {
    id: 2,
    name: "Диаграмма валовой прибыли",
    title: "10_MartGrossProfit",
    src: "http://11.222.333.444:8088/superset/explore/p/zoV8EZOvX3J/?standalone=1",
  },
  {
    id: 3,
    name: "Диаграмма распределения нагрузок",
    title: "11_MartGrossProfit",
    src: "http://11.222.333.444:8088/superset/explore/p/QDZWp41WKYq/?standalone=1&height=400",
  },
  {
    id: 4,
    name: "Тестовый чарт",
    title: "Test frontend",
    src: "http://11.222.333.444:8088/superset/explore/p/1aVjPELWgkq/?standalone=1&width=300&height=200",
  },
];

const Charts: React.FC = () => {
  return (
    <div className="charts-container">
      {charts.map((chart) => (
        <div key={chart.id}>
          <h2>{chart.name}</h2>
          <div className="chart-container">
            <h3>{chart.title}</h3>
            <iframe
              className="chart-iframe"
              src={chart.src}
              title={chart.title}
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Charts;
