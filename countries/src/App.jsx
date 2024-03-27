import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountryDisplay from './components/Countries'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        const countries = response.data
        setCountries(countries)
      })
  }, [])
  console.log(`${countries.length} countries retrieved`)

  const handleChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }

  const countriesToShow = (value === '') ? null : countries.filter(c => c.name.common.toLowerCase().includes(value))


  return (
    <div>
      <Filter searchTerm={value} onChange={handleChange}/>

      <CountryDisplay countries={countriesToShow} />
    </div>
  )
}

export default App