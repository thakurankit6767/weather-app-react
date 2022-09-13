import React, { useState } from "react";
import { iconUrlFromCode } from "./weatherApi";
import "./Css/forcast.css";
import TimeAndLocation from "./TimeAndLocation";

const Forecast = ({
  title,
  items,
  weather: { dt, timezone, name, country, temp, details, icon, desc },
}) => {
  const [tempday, setTempday] = useState(temp);
  const [desct, setDesc] = useState(desc);
  const [icons, setIcon] = useState(icon);

  const mydata = {
    tempday,
    desc,
    icons,
    name,
    country,
    dt,
    timezone,
    details,
  };

  console.log("items:", items);
  return (
    <>
      <div className="forcast-second-div">
        {items.map((data) => (
          <div key={data.title} className="forcastdiv">
            <div
              className="seconddiv"
              onClick={() => {
                setTempday(data.temp);
                setDesc(data.desc);
                setIcon(data.icon);
              }}
            >
              <p className="forcast-div-title">{data.title}</p>
              <p className="temp-div">
                <span>{`${data.min_temp.toFixed()}°`}</span>
                <span>{`${data.max_temp.toFixed()}°`}</span>
              </p>
              <img src={iconUrlFromCode(data.icon)} className="forecastimage" />

              <p className="desc">{data.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <TimeAndLocation mydata={mydata} />
    </>
  );
};

export default Forecast;
