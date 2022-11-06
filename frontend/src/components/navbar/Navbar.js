import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Badge,
  Box,
  colors,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { UserContext } from "../../GlobalContext";
import SearchBar from "./SearchBar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import logo from "../../images/logo.png";
import ProfileAvatar from "./ProfileAvatar";
import { useEffect } from "react";
import CartDrawer from "./CartDrawer";

function Navbar() {
  const { user, cartItems } = useContext(UserContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();
  useEffect(() => {
    //push cartItems to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Grid
      container
      sx={{
        px: 2,
        boxShadow: 2,
        mb: 1,
        minHeight: "12vh",
        position: "sticky",
        top: 0,
        background: "white",
        zIndex: 500,
      }}
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
          <img style={{ height: "2.8rem" }} alt="Logo" src={logo} />
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
          <IconButton onClick={() => setShowCart(true)}>
            <Badge badgeContent={cartItems.num} color="error">
              <ShoppingCartOutlinedIcon sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </Tooltip>
        <CartDrawer {...{ setShowCart, showCart }} />
        {!user && (
          <Tooltip title="login/register">
            <IconButton
              component={Link}
              to="login"
              state={{ from: location.pathname }}
            >
              <LoginOutlinedIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Tooltip>
        )}
        {user ? <ProfileAvatar user={user} /> : null}
      </Grid>
    </Grid>
  );
}

export default Navbar;
