import axios from "axios";
import { useEffect, useState } from "react";
const api_key = import.meta.env.VITE_API_KEY;
const Country = ({country}) => {
  const [weather, setWeather] = useState(null);
  useEffect (() => {
    axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/location=${country.capital}?key=${api_key}`)
      .then(
        resp => {
          const data = resp.data.currentConditions;
          const weatherData = {
            temp: data.temp,
            wind: data.windspeed,
            conditions: data.conditions
          }
          setWeather(weatherData);
        }
      )
  }, [country])
  const languages = [];
  for (let lang in country.languages) {
    languages.push(country.languages[lang]);
  }
  const imgSrc = country.flags?.png || country.flags?.svg
  const imgAlt = country.flags?.alt || `${country.name.common}'s flag`

  return (
    <>
      <h2>{country.name.common}</h2>
      <p>Captial: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map(
            lang => <li key={lang}>{lang}</li>
        )}
      </ul>
      <img src={imgSrc} alt={imgAlt} />
      {weather && <div>
        <p>Temperature: {weather.temp} °F</p>
        <p>Wind: {weather.wind} Mi/Hr</p>
        <p>Conditions: {weather.conditions}</p>
      </div>}
    </>
  )
}

export default Country;