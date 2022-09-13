import { DateTime } from "luxon";

const API_KEY = "df2e778ac7e8e0ca500cae5a0ed91927";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_max,
    temp_min,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
    humidity,
    pressure,
  };
};

const formatForecastWeather = (data) => {
  //console.log("data:",data)
  let { timezone, daily, hourly } = data;

  daily = daily.slice(1, 9).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      min_temp: d.temp.min,
      max_temp: d.temp.max,
      icon: d.weather[0].icon,
      desc: d.weather[0].main,
    };
  });

  hourly = hourly.slice(1, 15).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current, minutely, alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;

//extracted by using luxon package, read about it
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local Time : 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrlFromCode };
