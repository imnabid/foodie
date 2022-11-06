import React from "react";
import {
  Grid,
  Typography,
  Box,
  Avatar,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from '../../images/logo.png';
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
import { useEffect } from "react";

const categories = [
  { name: "Dashboard", icon: <DashboardIcon />, link: "/" },
  { name: "Order List", icon: <FactCheckIcon />, link: "order-list" },
  { name: "Add Item", icon: <AddBoxIcon />, link: "addItem" },
  { name: "Order History", icon: <ManageHistoryIcon />, link: "orderhistory" },
  { name: "Customer Care", icon: <SupportAgentIcon />, link: "customercare" },
];

const Sidebar = ({showSideBar, setShowSideBar}) => {
  const [view, setView] = useState("list");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(()=>{
    setShowSideBar(matches)
  },[matches])

  const handleChange = (event, nextView) => {
    setView(nextView);
    if(!matches) setShowSideBar(false);
  };
  return (
    <Box
      sx={{
        display: showSideBar?"flex":"none",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0F1B2A",
        position: "absolute",
        width: { md: "20%", xs: "100%" },
        top: 0,
        left:0,
        minHeight: "100%",
        zIndex:100
      }}
    >
      <Box>
        <Box sx={{display:{xs:'flex',md:'none'}, justifyContent:'flex-end'}}>
        <IconButton size="large" onClick={()=>setShowSideBar(false)} >
          <CloseIcon sx={{color:'#fff'}}/>
        </IconButton>
        </Box>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <img src={logo} alt="logo" height={50} />
        </Link>

        <ToggleButtonGroup
          orientation="vertical"
          value={view}
          exclusive
          fullWidth
          onChange={handleChange}
          sx={{ mt: 6 }}
        >
          {categories.map((category) => (
            <ToggleButton
              key={category.name}
              value={category.name}
              aria-label={category.name}
              component={Link}
              to={category.link}
              fullWidth
              color="info"
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                pl: "25%",
                fontSize: "1.3rem",
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography color="#fff"> {category.icon} </Typography>
                <Typography sx={{ ml: 1 }} color="#fff">
                  {" "}
                  {category.name}
                </Typography>
              </Box>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <></>
    </Box>
  );
};

export default Sidebar;
