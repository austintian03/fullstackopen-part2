import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capitalName }) => {
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY
  const baseURL = "https://api.openweathermap.org/data/2.5/weather"

  useEffect(() => {
    axios
    .get(`${baseURL}?q=${capitalName}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeather(response.data)
    })
  }, [])

  if(!weather) {
    return null
  }

  return (
    <div>
        <h2>Weather in {capitalName}</h2>
        <p>temperature {weather.main.temp} Celcius </p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather