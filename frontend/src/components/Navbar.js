import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Box,
  colors,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { UserContext } from "../GlobalContext";
import SearchBar from "./SearchBar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import logo from "../images/logo.png";
import ProfileAvatar from "./ProfileAvatar";
import { useEffect } from "react";
import { axiosInstanceGeneral } from "../axios/axios";

function Navbar() {
  const { user,setUser, authenticated, setAuthenticated} = useContext(UserContext);
  const [showSearch, setShowSearch] = useState(false);
  let location = useLocation();

  useEffect(()=>{
  if (authenticated){
      axiosInstanceGeneral.get('api/user-info/',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res=>{
        setUser(res.data)
        localStorage.setItem('user_info',JSON.stringify(res.data))
      })
      .catch(err=>console.log(err))
    }
  else{
    setUser(JSON.parse(localStorage.getItem('user_info')));
  }
  
  },[authenticated, setUser])

  useEffect(()=>{
    if(user){
      setAuthenticated(true)  // to set authenticated user true on page reload
    }
  },[user, setAuthenticated])


    

  return (
    <Grid
      container
      sx={{ px: 2, py: 1, boxShadow: 2, mb: 1, minHeight: "12vh" }}
    >
      <Grid
        item
        md={4}
        xs={4}
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "flex-end",
          pr: 1,
        }}
      >
        <Link className="link" to="/">
          <img style={{ height: "2.8rem" }} alt='Logo' src={logo} />
        </Link>

        <Box sx={{ ml: 2, display: { xs: "none", md: "flex" } }}>
          <Typography
            component={Link}
            to="/"
            color={colors.grey[500]}
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                color: colors.grey[700],
              },
            }}
          >
            <HomeIcon />
            Home
          </Typography>
          <Typography
            component={Link}
            to="/"
            color={colors.grey[500]}
            sx={{
              display: "flex",
              textDecoration: "none",
              alignItems: "center",
              mx: 2,
              "&:hover": {
                color: colors.grey[700],
              },
            }}
          >
            <LocalOfferIcon />
            Offers
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        xs={showSearch ? 8 : 5}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />
      </Grid>
      <Grid
        item
        md={1}
        xs={1}
        sx={{ display: showSearch ? "none" : "flex", alignItems: "center" }}
      >
        <Tooltip title="add to cart">
          <IconButton>
            <Badge badgeContent={4} color="warning">
              <ShoppingCartOutlinedIcon sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </Tooltip>
        {!user && (
          <Tooltip title="login/register">
            <IconButton component={Link} to="login">
              <LoginOutlinedIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Tooltip>
        )}
        {user?<ProfileAvatar username={user.username} fname={user.first_name} />:null}

      </Grid>
    </Grid>
  );
}

export default Navbar;
