import React from "react";
import "./Css/temperature.css";

import { formatToLocalTime, iconUrlFromCode } from "../components/weatherApi";

const TemperatureAndDetails = ({
  weather: {
    details,
    temp,
    temp_min,
    temp_max,
    humidity,
    sunrise,
    sunset,
    timezone,
    pressure,
  },
}) => {
  return (
    <div className="main-div-temparature">
      <div className="pressurehumid">
        <div className="pressurediv">
          <span style={{ fontWeight: "700" }}> Pressure</span>
          <span style={{ textAlign: "left", fontWeight: "200" }}>
            {pressure} hpa
          </span>
        </div>
        <div className="tempraturediv">
          <span style={{ fontWeight: "700" }}> Humidity</span>
          <span
            style={{ textAlign: "left", fontWeight: "200" }}
          >{`${humidity.toFixed()}%`}</span>
        </div>
      </div>
      <div className="sundiv">
        <div className="sunrise">
          <span className="sunname">Sunrise</span>
          <span className="suntime" style={{ fontWeight: "200" }}>
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </div>
        <div className="sunset">
          <span className="sunname">Sunset</span>
          <span className="suntime" style={{ fontWeight: "200" }}>
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureAndDetails;
