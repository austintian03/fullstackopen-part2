const LanguageList = ({ languages }) => {
    
    const langs = Object.entries(languages)

    return (
        <div>
            <p><b>languages</b></p>
            <ul>
                {langs.map(lang => 
                    <li key={lang[0]}>{lang[1]}</li>
                )}
            </ul>            
        </div>
    )
}

const Flag = ({ flag }) => {
    return (
        <img src={flag.png} alt={flag.alt}/>
    )
}

const CountryData = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>
                capital {country.capital[0]} <br />
                area {country.area}
            </p>
            <LanguageList languages={country.languages} />
            <Flag flag={country.flags} />
        </div>
    )
}

const CountryLine = ({ country, onClick }) => {
    return (
        <span>{country.name.common} <button onClick={onClick}>show</button><br /></span>
    )
}


const CountryDisplay = ({ countries, handleView }) => {
    console.log(countries)
  
    if (countries === null) {
      return null
    }
    
    if (countries.length > 10) {
        return <span>Too many matches, specify another filter</span>
    }

    if (countries.length === 1) {
        return (
            <div>
                <CountryData country={countries[0]}/>
            </div>
        )
    }

    return (
      <div>
        {countries.map(c =>
          <CountryLine key={c.cca2} country={c} onClick={() => handleView(c.name.common)}/>
        )}
      </div>
    )
  }

export default CountryDisplay