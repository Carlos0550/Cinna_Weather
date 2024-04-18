import { useContext,createContext } from "react";
import { useEffect, useState } from "react";

export const UserContext = createContext()

export const useUserData = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUserData necesita el UserContextProvider")
    }
    return context
}

export const UserContextProvider = ({children}) => {
    const [weather, setWeather] = useState(null)
    const [location, setLocation] = useState(null)
    const API_KEY = process.env.REACT_APP_API_KEY;
  
    useEffect(() => {
      const getUserLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
            },
            error => {
              console.error("Error getting user Location: ", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser!");
        }
      };
      getUserLocation();
    }, []);
  
    useEffect(() => {
      
      
      setTimeout(() => {
        if (location) {
          fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.latitude},${location.longitude}&aqi=no`)
            .then(response => response.json())
            .then(data => setWeather(data))
            .catch(error => console.error("Error obteniendo el clima: ", error));
        }
      }, 1000);
      
    }, [location, API_KEY]);


    return(
        <UserContext.Provider value={{weather}}>
            {children}
        </UserContext.Provider>
    )
}