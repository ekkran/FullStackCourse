import {useState, useEffect} from "react"
import axios from 'axios'

const SearchBar = ({value, handler}) => {
  return (
    <div>
      Search: <input value={value} onChange={handler} />
    </div>
  )
}

const CountryData = ({countryData, setCountryData}) => {
  
  if(countryData.length === 0){
    return <div></div>
  }
  
  if(countryData.length > 10){
    return (
    <div>
      <p>Too many matches, specify another filter</p>
    </div>)
  }
  if(countryData.length > 1){
    return(
      <div>
        <ul>
          {countryData.map(x => <li key={x.name.common}>
            {x.name.common} 
            <button onClick={() => setCountryData([x])}>Show</button>
            </li>)}
        </ul>
      </div>
    )
  }
  return (<div>
    <h1>{countryData[0].name.common}</h1>
    <div>
      Capital {countryData[0].capital[0]}
      Area {countryData[0].area}
    </div>
    <div>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryData[0].languages).map(x => {
            return <li key={x}>{x}</li>
        })}
      </ul>
      <img src={countryData[0].flags.png} />
    </div>
  </div>)
}

function App() {
  const [searchVal, setSearchVal] = useState('')
  const [countryData, setCountryData] = useState([])

  const handlerSearchBar = (event) => {
    setSearchVal(event.target.value)
  }
  
  useEffect(() => {
    if(searchVal != ""){
        axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          const match = response.data.filter(x => x.name.common.toLowerCase().includes(searchVal));
          setCountryData(match)
        })
      }
    },[searchVal])
    

  return (
    <div>
      <SearchBar value={searchVal} handler={handlerSearchBar} />
      <CountryData countryData={countryData} setCountryData={setCountryData}/>
    </div>
  );
}

export default App;
