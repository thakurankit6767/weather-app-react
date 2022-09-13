import React, { useEffect, useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import "./Css/input.css";
import Bulk from "./db.json";
//import { iconUrlFromCode } from "./weatherApi";
const Inputs = ({ setQuery, query, weather }) => {
  const [display, setDisplay] = useState([]);
  const [inputStyle, setInputStyle] = useState(false);
  const [displayMode, setDisplayMode] = useState(true);
  const handleSearchClick = (e) => {
    setQuery({ q: e.target.value });
    if (!query) setQuery({ q: query });
    setDisplayMode(false);
    if (query.q == "") {
      alert("please enter city name");
    }
  };

  const inPutBox = () => {
    setInputStyle((current) => !current);

    !query ? filterBulkData("") : filterBulkData(query);

    setDisplayMode(true);
  };
  const filterBulkData = (text) => {
    let matches = Bulk.filter((x) => {
      const regex = new RegExp(`${text}`, "gi");
      return x.city.match(regex) || x.state.match(regex);
    });
    setDisplay(matches);
  };
  const handleChange = (e) => {
    filterBulkData(e.target.value);
    setDisplayMode(true);
    setQuery({ q: e.target.value });
  };
  const setSearch = (city) => {
    const edit = Bulk.filter((item) => {
      return item.city === city;
    });
    //console.log("edit",edit)
    setQuery({ q: edit[0].city });
    setDisplayMode((current) => !current);
  };
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    }
  };
  //console.log(display,"display")
  //console.log("query",query)

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div
          className="input-main-div"
          style={{
            border: inputStyle ? "2px solid #0060DF" : "none",
          }}
        >
          <div>
            <UilLocationPoint onClick={handleLocationClick} size={25} />
          </div>
          <div className="inputdiv">
            <input
              onClick={inPutBox}
              type="text"
              value={query.q}
              onChange={handleChange}
              placeholder="search your city"
              className="input"
            />
          </div>
          <div>
            <UilSearch
              onClick={handleSearchClick}
              size={25}
              className="search"
            />
          </div>
        </div>
      </form>

      <div className="bulk-data-container">
        {displayMode &&
          display.map((e, i) => (
            <div
              key={i}
              className="bulk-data"
              onClick={() => setSearch(e.city)}
            >
              <div className="bulk-data-info">
                <strong>{e.city},</strong>
                <p>{e.state}</p>
              </div>
              <div className="bulk-data-icon">
                <UilLocationPoint size={25} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Inputs;

// const iconforcity=async(search)=>{
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=df2e778ac7e8e0ca500cae5a0ed91927`
//   const response = await fetch(url);
//   const resjson=await response.json();
//   console.log("hi",resjson)
//   return iconUrlFromCode(resjson.icon)
// }
//  useEffect(()=>{

//       // setdata(resjson.main)
//       iconforcity()
//    },[])
// //
