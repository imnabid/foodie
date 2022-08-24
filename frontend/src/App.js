import "./App.css";
import "./custom.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { UserContextProvider } from "./GlobalContext";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
