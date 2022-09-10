import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import GoogleLogin from "react-google-login";
import {handleGoogleLogin, handleCustomLogin} from "../axios/handleLogin";

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    handleCustomLogin(username,password)
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
    handleGoogleLogin(response.accessToken)
  };

  return (
    <Grid container sx={{ height: 500 }}>
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
      <Grid item xs={12} border={1} md={5} sx={{ px: "5vw" }}>
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
            sx={{ mt: 2, mb: 2 }}
          >
            Login
          </Button>
          <Typography textAlign="center" sx={{ color: "gray" }}>
            OR
          </Typography>

          <GoogleLogin
            buttonText="Login with Google"
            onSuccess={googleSuccess}
            onFailure={googleFail}
            cookiePolicy={"single_host_origin"}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
