import React, {useState} from "react";
import axios from "axios";

function App() {

  const [data,setData] = useState({});
  const [location,setLocation] = useState('');

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=82a470c3e3978a6172106e2bb362926e`;

  const searchLocation = (e) => {
    if(e.key === 'Enter'){
      axios.get(URL).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setLocation('')
    }
  }

  return (
    
    <div className="App">
      <div className="search">
        <input 
        value={location}
        onChange={(e) => {setLocation(e.target.value)}}
        onKeyDown={searchLocation}
        placeholder="Enter Location"
        type="text" />
      </div>

      {data.name !=undefined &&
        <div className="container">

        <div className="top">

          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temperature">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

        </div>

        <div className="bottom">

          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : '--'}
            <p>FEELS LIKE</p>
          </div>

          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : '--'}
            <p>HUMIDITY</p>
          </div>

          <div className="winds">
            {data.wind ? <p className="bold">{data.wind.speed}</p> : '--'}
            <p>WIND[MPH]</p>
          </div>

        </div>

      </div> }
    </div>
  );
}

export default App;
