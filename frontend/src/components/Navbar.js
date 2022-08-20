import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Grid, Typography } from "@mui/material";
import {customContext} from '../App';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const {username, setUsername} = useContext(customContext)
  let location = useLocation();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(localStorage.getItem('username'));

  }

  return (
    <Grid container>
      <Grid item  padding={2}xs={12} md={6} border={1} display='flex' justifyContent='space-around' alignItems='center'>
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/">About</Link>
        <Link className="link" to="/">Contact</Link>
      </Grid>
      <Grid item border={1} xs={12}  md={6} display='flex' justifyContent='center'>
        {         
          username ?  
          <Box display='flex' alignItems='center'>
            <Typography sx={{mx:3}}>{username}</Typography>
            <Button size='small' margin='normal' onClick={handleLogout}  variant="contained" color="primary">logout</Button>
          </Box>
          :
          (
          location.pathname !== '/login' &&
          <Box display='flex' alignItems='center'>
          <Button size='small' sx={{mx:2}} component={Link} to="/login" variant="contained" color="primary">Login</Button>
          <Button size='small' component={Link} to="/register" variant="contained" color="primary">Register</Button>
          </Box>)
        }
      </Grid>
    </Grid>
  );
}

export default Navbar;
