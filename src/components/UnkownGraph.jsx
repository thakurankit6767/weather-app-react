import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  Area,
} from "recharts";
import { formatToLocalTime } from "./weatherApi";

const UnkownGraph = ({ weather: { sunrise, sunset, timezone } }) => {
  const sunrisex = formatToLocalTime(sunrise, timezone, "hh:mm a");
  const sunsetx = formatToLocalTime(sunset, timezone, "hh:mm a");
  //console.log("weather",weather)

  const chartData = [
    { data: " ", val: -20 },
    { data: "", val: -10 },
    { data: sunrisex, val: 0 },
    { data: " ", val: 10 },
    { data: " ", val: 20 },
    { data: "", val: 30 },
    { data: "", val: 40 },
    { data: "", val: 50 },
    { data: "12:00am", val: 60 },
    { data: " ", val: 70 },
    { data: " ", val: 60 },
    { data: "", val: 50 },
    { data: "", val: 40 },
    { data: " ", val: 30 },
    { data: " ", val: 20 },
    { data: "", val: 10 },
    { data: sunsetx, val: 0 },
    { data: " ", val: -10 },
    { data: " ", val: -20 },
  ];

  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          textAlign: "left",
          height: "300px",
        }}
      >
        <ResponsiveContainer width="100%" aspect="auto">
          <AreaChart
            data={chartData}
            width={600}
            height={250}
            margin={{ top: 10, right: 30, left: 5, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="2" />
            <XAxis dataKey="data" interval={"preserveStartEnd"} />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="val"
              stroke="#FEDB41"
              activeDot={{ r: 8 }}
              fill="#FEF9EE"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UnkownGraph;
