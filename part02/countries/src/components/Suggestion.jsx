const Suggestion = ({countryName, setQuery}) => {
  return (
    <div>{countryName} <button onClick={() => setQuery(countryName)}>show</button></div>
  )
}

export default Suggestion;