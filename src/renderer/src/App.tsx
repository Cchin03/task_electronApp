import { useState } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import CityButtons from './components/CityButtons'
import './App.css'

const API_KEY = 'a3af92c34b8aeea0c460b0128b3773ef' 
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

interface WeatherData {
  name: string
  sys: { country: string }
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: { description: string; icon: string }[]
  wind: { speed: number }
}

interface ForecastData {
  list: {
    dt: number
    main: { temp_min: number; temp_max: number }
    weather: { description: string; icon: string }[]
  }[]
}

function App() {
  const [city, setCity] = useState<string>('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const handleCitySelect = async (selectedCity: string) => {
    setCity(selectedCity)
    await fetchWeather(selectedCity)
  }

  const handleSearch = async () => {
    if (!city.trim()) return
    await fetchWeather(city)
  }

  const fetchWeather = async (cityName: string) => {
    setLoading(true)
    setError(null)

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`),
        axios.get(`${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`)
      ])

      setWeather(weatherRes.data)
      setForecast(forecastRes.data)
    } catch (err) {
      setError('City not found. Please check the name and try again.')
      setWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1 className="app-title">🌤️ Weather Dashboard</h1>
      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
        loading={loading}
      />
      <CityButtons onSelect={handleCitySelect} /> 
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard data={weather} />}
      {forecast && <ForecastCard data={forecast.list} />}
      <footer className="app-footer">
        <p>🌤️ Weather Dashboard v1.1.0 — Now with auto-update support!</p>
      </footer>
    </div>
  )
}

export default App