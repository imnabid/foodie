import React from "react";
import {
  Grid,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../GlobalContext";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Sidebar from "./Sidebar";

const OwnerNavbar = () => { 

  const [showSideBar, setShowSideBar] = useState(true);
  const { user, setUser, setCombos, setShowOwnerPage, setShowSnackBar } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_info");
    localStorage.removeItem("owner");
    setShowSnackBar((prev) => {
      return { ...prev, show: true, msg: "You're Logged Out", type: "warning" };
    });
    setUser(null);
    setShowOwnerPage(false);
    setCombos([]);
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        position:'sticky',
        top:0,
        zIndex:99,
        alignItems: "center",
        py:0.5,
        pr:3,
        pl:1,
        justifyContent: {xs:"space-between", md:"flex-end"},
        background: "#f7c12c",
      }}
    >
      <IconButton sx={{display:{md:'none'}}} onClick={()=>setShowSideBar(true)}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <Box sx={{display:'flex', alignItems:'center', gap:1}}>
        <IconButton onClick={handleLogout}>
          <LogoutIcon sx={{fontSize:'25px'}} />
        </IconButton>

        <Link
          to="/profile"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <IconButton>
            <Avatar  src={user?.image} />
          </IconButton>
        </Link>

        <Typography variant="h6" color='text.secondary'>@{user?.username}</Typography>
      </Box>
      <Sidebar {...{showSideBar, setShowSideBar}}/>
    </Box>
  );
};

export default OwnerNavbar;
