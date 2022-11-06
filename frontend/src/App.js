import "./App.css";
import "./custom.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { UserContext } from "./GlobalContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import SnackBar from "./components/SnackBar";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Navbar from "./components/navbar/Navbar";
import LoginRequired from "./components/LoginRequired";
import Otp from "./pages/Otp";
import { Grid } from "@mui/material";
import useUserInfo from "./axios/useUserInfo";
import OwnerNavbar from "./components/owner/OwnerNavbar";
import CustomerProfile from "./pages/CustomerProfile";
import Dashboard from "./pages/owner/Dashboard";
import CustomerCare from "./pages/owner/CustomerCare";
import OrderHistory from "./pages/owner/OrderHistory";
import OwnerProfile from "./pages/owner/OwnerProfile";
import AddItem from "./pages/owner/AddItem";
import OrderList from "./pages/owner/OrderList";

function App() {
  const { user, showSnackBar, showOwnerPage } = useContext(UserContext);
  const location = useLocation();
  const userInfo = useUserInfo();

  useEffect(() => {
    const fetchData = () => {
      if (showOwnerPage) {
        userInfo(null, location.pathname);
      } else {
        userInfo(location.pathname, null);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {!showOwnerPage ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="otp" element={<Otp />} />
            <Route path="profile" element={<CustomerProfile />} />

            <Route element={<LoginRequired />}>
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </>
      ) : (
        <>
          <OwnerNavbar />
          <Grid container>
            {/* Dummy item for sidebar  */}
            <Grid item xs={0} md={2.4} />

            <Grid item xs={12} md={9.6}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<OwnerProfile />} />
                <Route path="/addItem" element={<AddItem />} />
                <Route path="/customercare" element={<CustomerCare />} />
                <Route path="/order-list" element={<OrderList />} />
                <Route path="/orderhistory" element={<OrderHistory />} />
              </Routes>
            </Grid>
          </Grid>
        </>
      )}

      {showSnackBar.show && <SnackBar />}
    </div>
  );
}

export default App;
