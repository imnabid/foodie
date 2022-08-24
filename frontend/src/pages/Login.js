import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { UserContext } from "../GlobalContext";

function Login() {
  const {setUsername} = useContext(UserContext);
  let navigate = useNavigate();
  console.log(localStorage.getItem('name'))

  const handleLogin = (e)=>{
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    axios.post('http://127.0.0.1:8000/api/login/',{username,password})
    .then(response=>{
      console.log(response);
      if(response.data.token){
      localStorage.setItem('token',response.data.token)
      localStorage.setItem('username',response.data.username)
      setUsername(response.data.username)
      navigate('/')
      }

    })
    .catch(err=>console.log(err.response))
  }


  return (
    <Grid container sx={{height:500}} >
      <Grid
        item
        border={1}
        xs={false}
        md={7}
        // sx={{
        //   backgroundImage: "url('https://i.pinimg.com/736x/f7/eb/d8/f7ebd86ff10d7d738d975f227a591600.jpg')",
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        // }}
      />
      <Grid item  xs={12} border={1} md={5} sx={{ px: "5vw" }}>
        <Box display="flex" justifyContent="center" marginTop={4}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
        </Box>
        <Box
          component="form"
          marginTop={3}
          noValidate
          display="flex"
          flexDirection="column"
          onSubmit={handleLogin}
        >
          <TextField
            margin="normal"
            variant="outlined"
            required
            id="username"
            name="username"
            label="username"
          />
          <TextField
            margin="normal"
            variant="outlined"
            required
            id="password"
            name="password"
            label="password"
            sx={{}}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
