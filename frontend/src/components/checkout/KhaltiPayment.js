import {
  Box,
  Button,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import khalti from "../../images/khalti.png";
import OTPInput from "otp-input-react";
import axios from "axios";

const publicKey = "test_public_key_cd941ede417e4ea895ef0c21c850e927";

const axiosKhalti = axios.create({
  baseUrl: "https://khalti.com/api/v2/payment/",
  headers: {
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Origin": "*",

    Authorization: "Key test_secret_key_af6b1ff6592a497c916c01cb46308335",
  },
});

function KhaltiPayment({ username }) {
  const [OTP, setOTP] = useState("");
  const [sentOtp, setSentOtp] = useState(false);

  const handleInitialization = (e) => {
    e.preventDefault();
    console.log(e.target.mobile.value, e.target.pin.value);
    axios
      .post(
        "https://khalti.com/api/v2/payment/initiate/",
        {
          public_key: publicKey,
          mobile: e.target.mobile.value,
          transaction_pin: e.target.pin.value,
          amount: 1000,
          product_identity: "Food",
          product_name: `user:${username}`,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",

            Authorization:
              "Key test_secret_key_af6b1ff6592a497c916c01cb46308335",
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };

  if (!sentOtp)
    return (
      <Box
        component="form"
        onSubmit={handleInitialization}
        sx={{
          display: "flex",
          p: 2.5,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box component="img" src={khalti} sx={{ height: 50 }} />
        <TextField
          name="mobile"
          size="small"
          label="Mobile"
          color="secondary"
          fullWidth
          sx={{
            width: { sm: 400 },
          }}
        />
        <TextField
          name="pin"
          size="small"
          label="Pin"
          color="secondary"
          type="password"
          fullWidth
          sx={{
            width: { sm: 400 },
          }}
        />
        <Button type="submit" variant="contained" color="secondary">
          Confirm
        </Button>
      </Box>
    );

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        p: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Box component="img" src={khalti} sx={{ height: 50 }} />
      <Typography color="secondary" variant="h6">
        Enter the OTP code sent to your mobile
      </Typography>

      <OTPInput
        inputStyles={{
          borderColor: "purple",
          borderRadius: "8px",
          "&:hover": {
            height: "50px",
            background: "purple",
          },
        }}
        value={OTP}
        onChange={setOTP}
        autoFocus
        OTPLength={6}
        otpType="number"
        disabled={false}
      />
      <Button type="submit" variant="contained" color="secondary">
        Confirm
      </Button>
    </Box>
  );
}

export default KhaltiPayment;
