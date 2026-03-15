import { format } from 'date-fns'

interface ForecastItem {
  dt: number
  main: {
    temp_min: number
    temp_max: number
  }
  weather: { description: string; icon: string }[]
}

interface ForecastCardProps {
  data: ForecastItem[]
}

function ForecastCard({ data }: ForecastCardProps) {
  // Get one forecast per day (every 8th item = 24hrs apart)
  const dailyForecast = data.filter((_, index) => index % 8 === 0).slice(0, 5)

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {dailyForecast.map((item) => (
          <div className="forecast-item" key={item.dt}>
            <p className="forecast-day">
              {format(new Date(item.dt * 1000), 'EEE, MMM d')}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
            />
            <p className="forecast-desc">{item.weather[0].description}</p>
            <div className="forecast-temps">
              <span className="temp-high">{Math.round(item.main.temp_max)}°C</span>
              <span className="temp-low">{Math.round(item.main.temp_min)}°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForecastCard