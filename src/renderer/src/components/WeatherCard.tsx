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

interface WeatherCardProps {
  data: WeatherData
}

function WeatherCard({ data }: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{data.name}, {data.sys.country}</h2>
        <img src={iconUrl} alt={data.weather[0].description} />
      </div>

      <div className="weather-temp">
        <h1>{Math.round(data.main.temp)}°C</h1>
        <p className="description">{data.weather[0].description}</p>
      </div>

      <div className="weather-details">
        <div className="detail">
          <span>Feels Like</span>
          <strong>{Math.round(data.main.feels_like)}°C</strong>
        </div>
        <div className="detail">
          <span>Humidity</span>
          <strong>{data.main.humidity}%</strong>
        </div>
        <div className="detail">
          <span>Wind Speed</span>
          <strong>{data.wind.speed} m/s</strong>
        </div>
        <div className="detail">
          <span>Pressure</span>
          <strong>{data.main.pressure} hPa</strong>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard