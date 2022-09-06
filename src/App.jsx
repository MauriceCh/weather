import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import './styles.css'
import './assets/HCfC.gif'


function App() {
  
  const [weather, setWeather] = useState({})
  const [isCelsius, setIsCelsius] = useState(true);
  document.body.style = `background: url("https://i.gifer.com/HCfC.gif") no-repeat center/100%`
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=39003f657ceb1ac4ec5bfa6bc93cc55c&units=metric`)
        .then(res => setWeather(res.data))
    }

  }, [])

  return (
    
    <div className="app">
      
      <div className="card">
      <h2>{weather.name}, {weather.sys?.country}</h2>
      <div><b>TEMP: </b>{isCelsius ? weather.main?.temp : (weather.main?.temp*9/5)+32} {isCelsius ? '°C' : '°F'} </div>
      <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`} style={{ height: "170px" }} alt="" />
      <div><b>{weather.weather?.[0].main} </b></div>
      <div><b>{weather.weather?.[0].description}</b></div>
      <div><b>WIND SPEED:</b> {weather.wind?.speed} m/s</div>
      <div><b>CLOUDS:</b>  {weather.clouds?.all} %</div>
      <div><b>PRESSURE:</b>  {weather.main?.pressure} hPa</div>
      <div><b>HUMIDITY:</b>  {weather.main?.humidity} %</div>
      <button onClick={() => setIsCelsius(!isCelsius)}>
        Change to {isCelsius ? '°F' : '°C'}
        </button>
        </div>
        </div>
      
      

    
  )
}

export default App
