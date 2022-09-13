import React from "react";
import { formatToLocalTime, iconUrlFromCode } from "../components/weatherApi";
import "./Css/temp.css";
const TimeAndLocation = ({ mydata }) => {
  return (
    <>
      <div className="maintempdetail">
        <h1
          style={{
            textAlign: "right",
            fontSize: "3rem",
            fontWeight: "700",
            margin: "0",
            color: "#000",
            marginLeft: "1rem",
          }}
        >{`${mydata.tempday.toFixed()}°C`}</h1>
        <img
          src={iconUrlFromCode(mydata.icons)}
          style={{ height: "8rem", marginLeft: "0.5rem", marginTop: "-2rem" }}
        />
        <div>
          <div className="">
            <p
              style={{ fontWeight: "bold" }}
            >{`${mydata.name}, ${mydata.country}`}</p>
          </div>
          {/* <div className=''>
    <p style={{fontWeight:"510"}}>
        {formatToLocalTime(mydata.dt, mydata.timezone)}
    </p>
</div> */}
        </div>
      </div>
    </>
  );
};

export default TimeAndLocation;
