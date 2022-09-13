import { useEffect, useState } from "react";
import "./App.css";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import getFormattedWeatherData from "../src/components/weatherApi";
import Hourly from "./components/Hourlygraph";
import UnkownGraph from "./components/UnkownGraph";
import Bottom from "./components/Bottom";


function App() {

  const [query, setQuery] = useState({q:"pune"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({...query, units }).then(data=> {
        setWeather(data);
      })
    }
  
    fetchWeather();
  }, [ query, units])

 
console.log(weather);
  return (
    <div className="main-app-div">
        
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits}  query={query} weather={weather}/>

         { weather && (
            <>
           
             <Forecast title="daily forecast" items={weather.daily} weather={weather}/>
             {/* <TimeAndLocation weather={weather}/> */}
             <Hourly items={weather.hourly} />
             <TemperatureAndDetails weather={weather}/>
              {/* <UnkownGraph weather={weather}/> */}
              <Bottom weather={weather}/>                 

               
            </>
         )}

         

    </div>
  );
}

export default App;