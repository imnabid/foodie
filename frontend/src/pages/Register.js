import {
  Box,
  Button,
  CircularProgress,
  colors,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Password from "../components/Password";
import image from "../images/register.jpg";
import SendIcon from "@mui/icons-material/Send";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { axiosInstanceGeneral } from "../axios/axios";
import { useContext } from "react";
import { UserContext } from "../GlobalContext";
import { useState } from "react";
const yup = require("yup");

const passwordRegex = /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    // .min(8,'min 8 characters')
    .matches(
      passwordRegex,
      "Minimum eight characters, at least one letter and one special character"
    )
    .required("Password is required"),
  address: yup.string().required("Address is required"),
});

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setShowSnackBar, setOtpEmail } = useContext(UserContext);
  const onSubmit = (values) => {
    setLoading(true);
    axiosInstanceGeneral
      .post("api/register/", values, {
        timeout: 10000,
      })
      .then((res) => {
        setLoading(false);
        setOtpEmail(values.email);
        setShowSnackBar({
          show: true,
          msg: "OTP code sent to your email",
          type: "success",
        });
        navigate("/otp");
      })
      .catch((err) => {
        console.log("custom err", err);
      }).finally(()=>{
        setLoading(false);
      })
  };
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        address: "",
      },
      validationSchema: schema,
      onSubmit: onSubmit,
    });

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
      <Grid
        item
        xs={false}
        md={7}
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
        md={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: { md: 5, xs: 2 },
        }}
      >
        <Typography
          component="h1"
          sx={{ color: colors.grey[700] }}
          variant="h5"
        >
          SIGN UP
        </Typography>
        <Paper
          elevation={5}
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, p: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="first_name"
                size="small"
                fullWidth
                label="First Name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                fullWidth
                label="Last Name"
                value={values.last_name}
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                fullWidth
                label="Username"
                value={values.username}
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
              />
            </Grid>
            <Grid item xs={6}>
              <Password
                size="small"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                label="Address"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />
            </Grid>
          </Grid>
          <Box sx={{ position: "relative" }}>
            <Button
              sx={{ mt: 2 }}
              fullWidth
              size="small"
              color="primary"
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={loading}
            >
              Sign Up
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-4px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item color="primary">
              <Typography
                component={Link}
                to="../login"
                color="primary"
                variant="p"
                sx={{ textDecoration: "underline" }}
              >
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Register;
