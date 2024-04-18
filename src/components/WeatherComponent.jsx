import React from 'react';
import { useUserData } from './context/context';
import "./css/weather.css";

function WeatherComponent() {
  const { weather } = useUserData();
  
  return (
    <div>
        <div className='weather__container'>
          <h1 className='weather__title'>Cinnamon Weather</h1>
          {weather && (
            <>
              <p className='weather__items'>{weather.location.name}, {weather.location.region}, {weather.location.country}</p>
              <p className='weather__items'>Ultima Actualizacion: {weather.current.last_updated}</p>
              <p className='weather__items'>Humedad: {weather.current.humidity}%</p>
              <p className='weather__items'>Temperatura: {weather.current.temp_c}°C</p>
              <p className='weather__items'>Condicion: {weather.current.condition.text}</p>
            </>
          )}
        </div>
    </div>
  );
}

export default WeatherComponent;
