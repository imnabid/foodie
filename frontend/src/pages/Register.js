import {
  Box,
  Button,
  CircularProgress,
  colors,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Password from "../components/Password";
import image from "../images/register.jpg";
import SendIcon from "@mui/icons-material/Send";
import SignInGoogle from "../components/SignInGoogle";
import { Link } from "react-router-dom";
import { handleRegister } from "./handleRequests";
import { ErrorSharp } from "@mui/icons-material";

function Registerr() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    u: { state: false,msg:'' },  //username error state
    e:{state:false,msg:''}         //email error state
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const t = e.currentTarget;
    console.log(t.username);
    const userInfo = {
      first_name: t.firstName.value,
      last_name: t.lastName.value,
      username: t.username.value,
      password: t.password.value,
      email: t.email.value,
      address: t.address.value,
    };
    setTimeout(() => setLoading(false), 2000);
    let res = handleRegister(userInfo);
    console.log(res.code)
  };

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      <Grid
        item
        xs={false}
        md={6}
        height="90vh"
        sx={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></Grid>
      <Grid
        item
        xs={12}
        sm={10}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: { md: 15, xs: 2 },
        }}
      >
        <Typography
          component="h1"
          sx={{ color: colors.grey[700] }}
          variant="h5"
        >
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                size="small"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                size="small"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={errors.u.state}
                size="small"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="family-name"
                helperText={errors.u.state && errors.u.msg}
              />
            </Grid>
            <Grid item xs={6}>
              <Password size="small" label="Password" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                size="small"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
              />
            </Grid>
          </Grid>
          <Button
            sx={{ mt: 2 }}
            fullWidth
            size="small"
            color="primary"
            type="submit"
            variant="contained"
            endIcon={!loading && <SendIcon />}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} size={20} />
            ) : (
              "Sign Up"
            )}
          </Button>
          <Typography sx={{ color: colors.grey[500], textAlign: "center" }}>
            or
          </Typography>
          <SignInGoogle sx={{ mb: 1 }} />
          <Grid container justifyContent="flex-end">
            <Grid item color="primary">
              <Link to="../login" className="link">
                <Typography
                  color="primary"
                  variant="p"
                  sx={{ textDecoration: "underline" }}
                >
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Registerr;
