interface SearchBarProps {
  city: string
  setCity: (value: string) => void
  onSearch: () => void
  loading: boolean
}

function SearchBar({ city, setCity, onSearch, loading }: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch()
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button onClick={onSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  )
}

export default SearchBar