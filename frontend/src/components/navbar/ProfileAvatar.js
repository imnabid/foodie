import {
  Avatar,
  Box,
  colors,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../GlobalContext";

function ProfileAvatar({ user }) {
  const { setUser, setShowSnackBar, setCartItems,setFetchUserInfo, setCombos } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_info");
    localStorage.removeItem("cartItems");
    setShowSnackBar((prev) => {
      return { ...prev, show: true, msg: "You're Logged Out", type: "warning" };
    });
    setUser(null);
    setCartItems({ note: "", items: [], num: 0 });
    setFetchUserInfo(false);
    setCombos([]);
    navigate('/');
    handleClose();
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton sx={{ ml: 1 }} onClick={handleClick}>
          <Avatar
            alt={user.first_name}
            sx={{ bgcolor: colors.red[500] }}
            src={user.image}
          />
        </IconButton>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: "14px",
            display: { xs: "none", md: "block" },
          }}
        >
          {user.username}
        </Typography>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disabled sx={{ display: { xs: "block", md: "none" } }}>
          <Typography color="error">{user.username}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to='orders' onClick={handleClose}>My Orders</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default ProfileAvatar;
