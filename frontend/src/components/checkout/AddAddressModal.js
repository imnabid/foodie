import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";
import { UserContext } from "../../GlobalContext";

function AddAddressModal({ setShowModal, address, setAddress }) {
  const [loading, setLoading] = useState(false);
  const { setShowSnackBar } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      full_name: e.target.name.value,
      mobile: e.target.mobile.value,
      city: e.target.city.value,
      street: e.target.street.value,
      landmark: e.target.landmark.value,
    };
    axiosInstanceGeneral
      .request({
        url: "api/address/",
        method: address ? "patch" : "post",
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setAddress(res.data);
        setLoading(false);
        setShowSnackBar({
          show: true,
          msg: "update successful",
          type: "success",
        });
        setShowModal(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setShowSnackBar({
            show: true,
            msg: "Address Already Added!",
            type: "error",
          });
          return;
        }
        setShowSnackBar({
          show: true,
          msg: "Server Error!",
          type: "error",
        });
      });
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        px: { xs: 2, sm: 7 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" color="error">
        Custom Address Form
      </Typography>
      <TextField
        color="info"
        fullWidth
        size="small"
        name="name"
        label="Full Name"
        defaultValue={address?.full_name}
      />
      <TextField
        color="info"
        fullWidth
        size="small"
        name="mobile"
        label="Mobile Number"
        defaultValue={address?.mobile}
      />
      <TextField
        name="city"
        color="info"
        fullWidth
        size="small"
        label="City/Municipality"
        defaultValue={address?.city}
      />
      <TextField
        color="info"
        fullWidth
        size="small"
        name="street"
        label="Street Address"
        defaultValue={address?.street}
      />
      <TextField
        name="landmark"
        color="info"
        fullWidth
        size="small"
        label="Landmark(optional)"
        defaultValue={address?.landmark}
      />
      <Button
        color="success"
        type="submit"
        variant="contained"
        disabled={loading}
      >
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

export default AddAddressModal;
