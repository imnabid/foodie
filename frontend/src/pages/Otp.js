import {
  Box,
  Button,
  InputBase,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import otp from "../images/otp.jpg";
import OTPInput from "otp-input-react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../GlobalContext";
import { axiosInstanceGeneral } from "../axios/axios";
import { useNavigate } from "react-router-dom";

function Otp() {
  const [OTP, setOTP] = useState("");
  const { otpEmail, setShowSnackBar } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    axiosInstanceGeneral
      .post("api/verify-otp/", {
        email: otpEmail,
        otp: OTP,
      })
      .then((res) => {
        setShowSnackBar({
          show: true,
          msg: res.data.status,
          type: "success",
        });
        navigate('/login');
      })
      .catch((err) => {
        setShowSnackBar({
          show: true,
          msg: err.response.data?.status,
          type: "error",
        });
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Box component="img" src={otp} sx={{ width: 300 }} />
      <Typography variant="h6" color="error">
        Enter the OTP Code sent to your Email
      </Typography>

      <OTPInput
        inputStyles={{
          borderColor: "#fd2020",
          borderRadius: "5px",
          "&:hover": {
            height: "200px",
            background: "red",
          },
        }}
        value={OTP}
        onChange={setOTP}
        autoFocus
        OTPLength={5}
        otpType="number"
        disabled={false}
      />
      <Button
        variant="contained"
        color="error"
        onClick={handleClick}
        sx={{ borderRadius: "10px" }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default Otp;
