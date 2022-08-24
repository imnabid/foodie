import { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserContextProvider = ({children})=> {

  const [username, setUsername] = useState(localStorage.getItem('username')); //initially null
  const info = {username, setUsername};

  return (
    <UserContext.Provider value={info}>
      {children}
    </UserContext.Provider>
  )
}