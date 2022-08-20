import "./App.css";
import "./custom.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { createContext, useState } from "react";

export const customContext = createContext("");

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username')); //initially null
  const info = {username, setUsername};
  return (
    <div>
      <BrowserRouter>
        <customContext.Provider value={info}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </customContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
