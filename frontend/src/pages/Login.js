import {
  Box,
  Button,
  CircularProgress,
  colors,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { gapi } from "gapi-script";
import { useState } from "react";
import { useContext, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { Link, useLocation } from "react-router-dom";
import { axiosInstanceGeneral } from "../axios/axios";
import useUserInfo from "../axios/useUserInfo";
import ForgotPassword from "../components/login/ForgotPassword";
import ModalWrapper from "../components/ModalWrapper";
import Password from "../components/Password";
import { UserContext } from "../GlobalContext";
import image from "../images/login.jpg";
const yup = require("yup");

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const userInfo = useUserInfo();
  const from = location.state?.from || "/";
  const { setFetchUserInfo, setShowSnackBar } = useContext(UserContext);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);
    axiosInstanceGeneral
      .post("auth/token/", {
        grant_type: "password",
        username: values.username,
        password: values.password,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      })
      .then(async (res) => {
        if (res.status === 200) {
          const data = res.data;
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          setShowSnackBar((prev) => {
            return { ...prev, show: true };
          });
          await userInfo(from, null);
        }
      })
      .catch((err) => {
        setShowSnackBar((prev) => {
          return {
            ...prev,
            show: true,
            msg: err.response.data.error_description,
            type: "error",
          };
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: handleLogin,
    });
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
      .then(async (res) => {
        if ((res.status = 200)) {
          const data = res.data;
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          setFetchUserInfo(true);
          setShowSnackBar((prev) => {
            return { ...prev, show: true };
          });
          await userInfo(from, null);
        }
      })
      .catch((err) => {
        console.log("error occured", err);
        setShowSnackBar((prev) => {
          return {
            ...prev,
            show: true,
            msg: "Google Login Failed!",
            type: "error",
          };
        });
      });
  };

  return (
    <Grid container sx={{ pt: 4 }}>
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
          onSubmit={handleSubmit}
          sx={{ boxShadow: 4, p: 3, mt: 3 }}
        >
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
            sx={{ mb: 3 }}
          />
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
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            sx={{ mt: 3, position: "relative" }}
          >
            Login
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-10px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Button>
          <Typography
            component={Link}
            onClick={() => setShowForgotModal(true)}
            to="#"
            color="primary"
            variant="p"
            sx={{
              textDecoration: "underline",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            Forgot password?
          </Typography>
          {
            <ModalWrapper
              show={showForgotModal}
              setShow={setShowForgotModal}
              setShowCombo={() => false} //dummy function
            >
              <ForgotPassword setShowForgotModal={setShowForgotModal} />
            </ModalWrapper>
          }
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
            sx={{
              textDecoration: "underline",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            Don't have an account? Sign Up
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
