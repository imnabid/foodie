import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useState } from "react";

export const UserContext = createContext();
const theme = createTheme({
  palette:{
    error:{
      main:'#fd2020'
    },
  }
})

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState({
    show: false,
    msg: "Login Successful!",
    type: "success",
  });
  const [combos, setCombos] = useState([]);
  const [ cartItems, setCartItems] = useState({
    note:'',
    items:[],
    num:0
  });
  
  const info = {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    showSnackBar,
    setShowSnackBar,
    combos,
    setCombos,
    cartItems,
    setCartItems
    
  };

  return <UserContext.Provider value={info}>
    <ThemeProvider theme={theme}>

    {children}
    </ThemeProvider>
    </UserContext.Provider>;
};
