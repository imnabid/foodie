import { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserContextProvider = ({children})=> {

  const [user, setUser] = useState(); 
  const [authenticated, setAuthenticated] = useState(false); 
  const [showSnackBar, setShowSnackBar] = useState({
    show:false,
    msg:'Login Successful!',
    type:'success'
  }); 

  const info = {user, setUser, authenticated, setAuthenticated, showSnackBar, setShowSnackBar};

  return (
    <UserContext.Provider value={info}>
      {children}
    </UserContext.Provider>
  )
}