import {
  Box,
  Button,
  colors,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { gapi } from "gapi-script";
import { useContext, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstanceGeneral } from "../axios/axios";
import Password from "../components/Password";
import { UserContext } from "../GlobalContext";
import image from "../images/login.jpg";

function Login() {
  const navigate = useNavigate();
  const {setAuthenticated, setShowSnackBar} = useContext(UserContext)
  
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    axiosInstanceGeneral
    .post("auth/token/", {
      grant_type: "password",
      username: username,
      password: password,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    })
    .then((res) => {
      if ((res.status = 200)) {
        const data = res.data;
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        setShowSnackBar((prev)=>{
          return {...prev,show:true}
        })
        setAuthenticated(true);
        navigate('/');
      }
    })
    .catch((err) => {
      setShowSnackBar((prev)=>{
        return {...prev,show:true, msg:err.response.data.error_description,type:'error'}
      })
    });
  };

  useEffect(() => {
    // for google auth to work
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const googleFail = (response) => {
    console.log(response);
  };

  const googleSuccess = (response) => {
    axiosInstanceGeneral
    .post("auth/convert-token", {
      token: response.accessToken,
      backend: "google-oauth2",
      grant_type: "convert_token",
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    })
    .then((res) => {
      if ((res.status = 200)) {
        const data = res.data;
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        setAuthenticated(true);
        setShowSnackBar((prev)=>{
          return {...prev,show:true}
        })
        navigate('/');
      }
    })
    .catch((err) => {
    console.log('error occured',err)
    setShowSnackBar((prev)=>{
      return {...prev,show:true, msg:'Google Login Failed!',type:'error'}
    })

  });
  };

  return (
    <Grid container sx={{pt:4}} >
      <Grid
        item
        xs={false}
        md={7}
        sx={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <Grid item xs={12} md={5} sx={{ px: "5vw" }}>
        <Box display="flex" justifyContent="center" marginTop={4}>
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: colors.grey[700] }}
          >
            LOGIN
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          display="flex"
          flexDirection="column"
          onSubmit={handleLogin}
          sx={{ boxShadow: 4, p: 3, mt: 3 }}
        >
          <TextField
            margin="normal"
            size="small"
            variant="outlined"
            required
            id="username"
            name="username"
            label="username"
            sx={{ mb: 3 }}
          />
          <Password size="small" label="Password" />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          <Typography textAlign="center" sx={{ color: "gray", mb: 2 }}>
            OR
          </Typography>

          <GoogleLogin
            onSuccess={googleSuccess}
            onFailure={googleFail}
            theme="dark"
            cookiePolicy={"single_host_origin"}
          />
          <Typography
            component={Link}
            to="../register"
            color="primary"
            variant="p"
            sx={{ textDecoration: "underline",display:'flex',justifyContent:'flex-end' }}
          >
            Don't have an account? Sign Up
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
