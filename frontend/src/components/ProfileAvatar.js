import {
  Avatar,
  colors,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../GlobalContext";

function ProfileAvatar({fname, username}) {
  const {setAuthenticated, setShowSnackBar} = useContext(UserContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout =()=>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_info')
    setShowSnackBar((prev)=>{
      return{...prev, show:true, msg:"You're Logged Out", type:'warning'}
    })
    setAuthenticated(false)
    handleClose()
  }
  return (
    <>
    <Tooltip title={username}>
      <IconButton sx={{ ml: 1 }} onClick={handleClick}>
        <Avatar
          alt={fname}
          sx={{ bgcolor: colors.red[500] }}
          src="/static/images/avatar/1.jpg"
        />
      </IconButton>
    </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Orders</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
</>
  );
}

export default ProfileAvatar;
