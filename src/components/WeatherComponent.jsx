import React, {useState} from 'react';
import Swal from 'sweetalert2'
import { useUserData } from './context/context';
import "./css/weather.css";

function WeatherComponent() {
  const { location,setLocation } = useUserData();

  const [locationData, setLocationData] = useState({
    location: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLocationData((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (locationData.location === "") {
      Swal.fire({
        title: "Campos vacios!",
        text: "El buscador no debe estar vacio!",
        icon: "warning"
      });
    }else{
      setLocation(locationData.location)
    }
  }

  return (
    <div>
        <div className='weather__container'>
          <h1 className='weather__title'>Cinnamon Weather</h1>
          <form onSubmit={handleSubmit} className="weather-form">
            <label className="weather-label">
              Ingresa una ciudad o región para ver el clima
              <input
                type="text"
                value={locationData.location}
                onChange={handleInputChange}
                placeholder="Ej. Posadas, Misiones, Argentina"
                name="location"
                className="weather-input"
              />
            </label>
            <button type="submit" className="weather-button">
              Buscar
            </button>
          </form>
            {location && location.location && (
              <>
                <p className='weather__items'>{location.location.name}, {location.location.region}, {location.location.country}</p>
                <p className='weather__items'>Ultima Actualizacion: {location.current.last_updated}</p>
                <p className='weather__items'>Humedad: {location.current.humidity}%</p>
                <p className='weather__items'>Temperatura: {location.current.temp_c}°C</p>
                <p className='weather__items'>Condicion: {location.current.condition.text}</p>
              </>
            )}

        </div>
    </div>
  );
}

export default WeatherComponent;
