import React from "react";
import Chart from "react-apexcharts";
import "./Css/Hourlygraph.css";

const Hourly = ({ items }) => {
  const chartDatatemp = items.map((el) => {
    return el.temp;
  });
  // console.log("chartData:", chartDatatemp)
  const chartDatatitle = items.map((el) => {
    return el.title;
  });

  const res = {
    options: {
      chart: {
        height: 270,
        type: "area",
      },
      xaxis: {
        categories: chartDatatitle,
      },
    },

    series: [
      {
        type: "area",
        name: "temp",
        data: chartDatatemp,
      },
    ],
    dataLabels: {
      enabled: false,
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    stroke: {
      curve: "smooth",
    },
  };

  return (
    <>
      <div className="app">
        <div className="row">
          <div className="mixed-chart" style={{ opacity: "0.8" }}>
            <Chart
              options={res.options}
              series={res.series}
              type="line"
              width="1000"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hourly;
