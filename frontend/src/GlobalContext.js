import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useState } from "react";

export const UserContext = createContext();

const theme = createTheme({
  palette: {
    error: {
      main: "#fd2020",
    },
  },
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState(150);
  const [fetchUserInfo, setFetchUserInfo] = useState(true);
  const [showSnackBar, setShowSnackBar] = useState({
    show: false,
    msg: "Login Successful!",
    type: "success",
  });
  const [categories, setCategories] = useState([]);
  const [combos, setCombos] = useState([]);
  const [comboChange, setComboChange] = useState(false);
  const [otpEmail, setOtpEmail] = useState("dhakalnabin209@gmail.com");
  const [cancellationTime, setCancellationTime] = useState(60); //in seconds
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || {
      note: "",
      items: [],
      num: 0,
    }
  );

  const info = {
    user,
    setUser,
    deliveryCharge,
    setDeliveryCharge,
    fetchUserInfo,
    setFetchUserInfo,
    otpEmail,
    setOtpEmail,
    showSnackBar,
    setShowSnackBar,
    combos,
    setCombos,
    comboChange,
    setComboChange,
    cartItems,
    setCartItems,
    categories, //made global inorder to handle searching
    setCategories,
  };

  return (
    <UserContext.Provider value={info}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </UserContext.Provider>
  );
};
