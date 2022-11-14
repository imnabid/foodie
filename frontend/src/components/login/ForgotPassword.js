import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";
import { UserContext } from "../../GlobalContext";
import OTPInput from "otp-input-react";
import { useFormik } from "formik";
import Password from "../Password";

const yup = require("yup");

const passwordRegex = /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .matches(
      passwordRegex,
      "Minimum eight characters, at least one letter and one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .matches(
      passwordRegex,
      "Minimum eight characters, at least one letter and one special character"
    )
    .required("Password is required"),
});

function ForgotPassword({ setShowForgotModal }) {
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const { setShowSnackBar } = useContext(UserContext);
  const [sentOtp, setSentOtp] = useState(false);
  const [email, setEmail] = useState();

  const verifyOtp = (values) => {
    const newPassword = values.newPassword;
    const confirmPassword = values.confirmPassword;

    if (newPassword !== confirmPassword) {
      return setShowSnackBar({
        show: true,
        msg: "passwords don't match",
        type: "error",
      });
    }
    setLoading(true);
    axiosInstanceGeneral
      .post("api/forgot-password/", {
        email: email,
        otp: OTP,
        password: newPassword,
      })
      .then((res) => {
        setShowSnackBar({
          show: true,
          msg: res.data.status,
          type: "success",
        });
        setShowForgotModal(false);
      })
      .catch((err) => {
        setShowSnackBar({
          show: true,
          msg: err.response.data.status,
          type: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: schema,
      onSubmit: verifyOtp,
    });

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setEmail(e.target.email.value);
    axiosInstanceGeneral
      .post("api/forgot-password/", {
        email: e.target.email.value,
      },{
        timeout:10000
      })
      .then((res) => {
        setSentOtp(true);
        setShowSnackBar({
          show: true,
          msg: res.data.status,
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setShowSnackBar({
          show: true,
          msg: "error occurred",
          type: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  if (sentOtp)
    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          pt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2.5,
        }}
      >
        <Typography variant="h6" color="primary">
          Enter the OTP code
        </Typography>
        <Box>
          <OTPInput
            inputStyles={{
              borderColor: "#0077b6",
              borderRadius: "5px",
              "&:hover": {
                height: "200px",
                background: "blue",
              },
            }}
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={5}
            otpType="number"
            disabled={false}
          />
        </Box>
        <Password
          size="small"
          label="New Password"
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!touched.newPassword && !!errors.newPassword}
          helperText={touched.newPassword && errors.newPassword}
          sx={{
            width: { sm: 400 },
          }}
        />
        <Password
          size="small"
          label="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!touched.confirmPassword && !!errors.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
          sx={{
            width: { sm: 400 },
          }}
        />

        <Button variant="contained" type="submit" disabled={loading}>
          Submit
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
      </Box>
    );
  return (
    <Box
      component="form"
      onSubmit={handleForgotPassword}
      sx={{
        p: 2,
        pt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2.5,
      }}
    >
      <TextField
        name="email"
        size="small"
        label="Enter your email"
        sx={{
          width: { sm: 400 },
        }}
      />
      <Button variant="contained" type="submit" disabled={loading}>
        Submit
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
    </Box>
  );
}

export default ForgotPassword;
