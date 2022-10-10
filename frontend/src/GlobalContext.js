import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState({
    show: false,
    msg: "Login Successful!",
    type: "success",
  });
  const [combos, setCombos] = useState([]);

  const info = {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    showSnackBar,
    setShowSnackBar,
    combos,
    setCombos,
  };

  return <UserContext.Provider value={info}>{children}</UserContext.Provider>;
};
