import { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserContextProvider = ({children})=> {

  const [username, setUsername] = useState(); //initially null
  const info = {username, setUsername};

  return (
    <UserContext.Provider value={info}>
      {children}
    </UserContext.Provider>
  )
}