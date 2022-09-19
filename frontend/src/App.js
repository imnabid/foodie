import "./App.css";
import "./custom.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { UserContext } from "./GlobalContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext } from "react";
import SnackBar from "./components/SnackBar";

function App() {
  const {showSnackBar} = useContext(UserContext)

  return (
    <div>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
          {showSnackBar.show && <SnackBar/>}
      </BrowserRouter>
    </div>
  );
}

export default App;
