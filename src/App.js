import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {

  const [data,setData] = useState({});
  const [unit , setUnit] = useState('metric');
  const [city ,setCity] = useState('');


  const fetchWeatherData = async (location,measure) => {
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${measure}&appid=82a470c3e3978a6172106e2bb362926e`;
    const result = await axios.get(url);
    console.log(result.data);
    setData(result.data);
    }catch(err) {
      alert('city not found !!')
    }
  }


  useEffect(()=> {
    if(!city) return;
    fetchWeatherData(city,unit);
  },[city,unit])



  const weatherUnit = async () => {
    if (unit === 'metric') setUnit('imperial');  
    else setUnit('metric');
  }

  const enterKey = (e) => {
    if(e.key === 'Enter') {
      setCity(e.target.value);
      e.target.value = '';
    }
  }


  return (
    
    <div className=
        {
        (data.weather) ?
        ( (data.weather[0].main === 'Haze' || data.weather[0].main === 'Mist') ? "App haze" : 
            ((data.weather[0].main === 'Snow') ? "App snow" : 
              ((data.weather[0].main === 'Rain') ? "App rain" : "App"))) 
        :"App"
        }
    >
      <div className="overlay">
        <div className="wrapper">
          <div className="header">
            <input onKeyDown={enterKey} type='text' placeholder="Type City here.."/>
            <button onClick={weatherUnit}>{unit === 'metric' ? '°C' : '°F'}</button>
          </div>
          <div className="container">
            <div className="top">
              <div className="details">
                <div className="temperature">
                  {data.main ? <h1>{data.main.temp.toFixed()}{unit === 'metric' ? '°C' : '°F'}</h1> : '--'}
                </div>
                <div className="cityname">
                  {data.name ? <p>{data.name}</p> : '---'}
                </div>
              </div>
              <div className="description">
                {data.weather? <p>{data.weather[0].main}</p> : '---'}
              </div>
            </div>
            <div className="bottom">
              <div className="feels">
                {data.main ? <p>{data.main.feels_like.toFixed()}{unit === 'metric' ? '°C' : '°F'}</p> : '--'}
                <span>Feels</span>
              </div>
              <div className="humidity">
                {data.main ? <p>{data.main.humidity}%</p> : '--'}
                <span>Humidity</span>
              </div>
              <div className="windspeed">
                {data.wind ? <p>{data.wind.speed}</p> : '--'}
                <span>MPH</span>
              </div>
            </div>
          </div>
        
        </div>
      </div>

    </div>
  );
}

export default App;