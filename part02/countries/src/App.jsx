import { useEffect, useState } from 'react'
import axios from 'axios';
import Country from './components/Country';
import Suggestion from './components/Suggestion';

const App = () => {
  const [query, setQuery] = useState('');
  const [countriesData, setCountriesData] = useState([]);
  const [matchedCountries, setMatchedCountries] = useState([]);
  useEffect (() => {
      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(
        resp => {
          setCountriesData(resp.data);
        }
      )
    }, [])

  const updateMatchedCountries = (query) => {
    setMatchedCountries(countriesData.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase())));
  }

  const handleQueryChange = e => {
    setQuery(e.target.value);
    updateMatchedCountries(e.target.value);
  }
  if (countriesData.length === 0) {
    return <div className="loading">
      Loading Data...
    </div>
  } else {
    return (
      <>
        <div className="input-div">
          <label htmlFor="search">Find Countries: </label>
          <input id="search" value={query} onChange={(e) => handleQueryChange(e)} />
        </div>
        {matchedCountries &&
          matchedCountries.length === 1
          ? 
          <Country country={matchedCountries[0]}/>
          : 
          matchedCountries.length <= 10 
          ?
          matchedCountries.map (
            country => <Suggestion key={country.ccn3} setQuery={setQuery} countryName={country.name.common} />
          ) 
          :
          <p>Too many matches, specify another filter</p>
        }
      </>
    )
  }}

export default App;
