import { useEffect, useState } from 'react'
import axios from 'axios';
import Country from './components/Country';
import Suggestion from './components/Suggestion';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect (() => {
    if (query === "") return;
    const delaySearch = setTimeout(() => {
      axios.get('http://localhost:3000/all')
      .then(
        resp => {
          const data = resp.data.filter(
            country => country.name.common.toLowerCase().includes(query.trim().toLowerCase())
          )
          setCountries(data);
        }
      )
    }, 300)
    return () => clearTimeout(delaySearch);
  }, [query])

  return (
    <>
      <div>Find Countries: <input value={query} onChange={e => setQuery(e.target.value)} /></div>
      {countries &&
        countries.length === 1
        ? 
        <Country country={countries[0]}/>
        : 
        countries.length <= 10 
        ?
        countries.map (
          country => <Suggestion key={country.ccn3} setQuery={setQuery} countryName={country.name.common} />
        ) 
        :
        <p>Too many matches, specify another filter</p>
      }
    </>
  )
}

export default App;
