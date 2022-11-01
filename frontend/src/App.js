import "./App.css";
import "./custom.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { UserContext } from "./GlobalContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext } from "react";
import SnackBar from "./components/SnackBar";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Navbar from "./components/navbar/Navbar";
import LoginRequired from "./components/LoginRequired";
import Layout from "./components/Layout";
import Otp from "./pages/Otp";

function App() {
  const { showSnackBar } = useContext(UserContext);
  const x = {
    name: "nabin",
    age: "24",
  };
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="otp" element={<Otp />} />

            <Route element={<LoginRequired />}>
              <Route path="/checkout" element={<Checkout />} />
            </Route>
              <Route path="/orders" element={<Orders />} />

          </Route>
        </Routes>
        {showSnackBar.show && <SnackBar />}
      </BrowserRouter>
    </div>
  );
}

export default App;
