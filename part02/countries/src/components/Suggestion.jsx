const Suggestion = ({countryName, setQuery}) => {
  return (
    <div className="suggestion">
      <p>{countryName}</p>
      <button onClick={() => setQuery(countryName)}>show</button>
    </div>
  )
}

export default Suggestion;