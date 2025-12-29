import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Appcontext = createContext(null);

const AppContextProvider = ({ children }) => {
  const backendUrl = "https://backend-auth-z8ke.onrender.com/api/auth";
  const [isLoged, setIsLogged] = useState(false);
  const [userdata,setuserdata] = useState()
    
  const fetchUser = async()=>{
    try {
       const res = await axios.get(`${backendUrl}/user`,{withCredentials:true})
       setuserdata(res.data.user)
    } catch (error) {
      
         console.log(error.message);
         
    }
  }

      useEffect(()=>{
          fetchUser()
     },[backendUrl])


  const value = {
    backendUrl,
    isLoged,
    setIsLogged,

    userdata
 
  };

  return (
    <Appcontext.Provider value={value}>
      {children}
    </Appcontext.Provider>
  );
};

export default AppContextProvider;
