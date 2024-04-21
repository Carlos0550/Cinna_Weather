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
    const [location, setLocation] = useState(null)
    const API_KEY = process.env.REACT_APP_API_KEY;
    useEffect(() => {
      setTimeout(() => {
        if (location) {
          fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`)
            .then(response => response.json())
            .then(data => {
              if (data && data.location && data.current) {
                setLocation(data)
              }else{
                console.log("Error obteniendo el clima: ", data)
              }
            })
            .catch(error => console.error("Error obteniendo el clima: ", error));
        }
      }, 100);
    }, [location, API_KEY]);
    console.log(location)

    return(
        <UserContext.Provider value={{setLocation, location}}>
            {children}
        </UserContext.Provider>
    )
}