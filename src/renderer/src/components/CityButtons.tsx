interface CityButtonsProps {
  onSelect: (city: string) => void
}

const POPULAR_CITIES = [
  'Kuala Lumpur',
  'London',
  'Tokyo',
  'New York',
  'Sydney',
  'Dubai',
  'Paris',
  'Singapore'
]

function CityButtons({ onSelect }: CityButtonsProps) {
  return (
    <div className="city-buttons">
      <p className="city-buttons-label">🌍 Popular Cities</p>
      <div className="city-buttons-list">
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            className="city-btn"
            onClick={() => onSelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CityButtons