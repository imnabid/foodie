import { Box, Button, Typography, Avatar, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useState } from "react";
import { useContext } from "react";
import { useFormik } from "formik";
import { axiosInstanceGeneral } from "../axios/axios";
import { UserContext } from "../GlobalContext";
import Password from "./Password";
const yup = require("yup");

const passwordRegex = /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
const schema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .matches(
      passwordRegex,
      "Minimum eight characters, at least one letter and one special character"
    )
    .required("Password is required"),
});

const ChangeProfile = () => {
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState();
  const [selectedImg, setSelectedImg] = useState();
  const { user, setUser, setShowSnackBar } = useContext(UserContext);
  
  const updateUserInfo = (data, headers, msg) => {
    axiosInstanceGeneral
      .patch("accounts/user/", data, {
        headers: headers,
      })
      .then((res) => {
        resetForm();
        setUser(res.data);
        setShowSnackBar({
          show: true,
          msg: msg,
          type: "success",
        });
      })
      .catch((err) =>
        setShowSnackBar({
          show: true,
          msg: err.response.data.status,
          type: "error",
        })
      )
      .finally(() => setLoading(false));
  };

  const changeProfileImg = () => {
    const data = {
      image: selectedImg,
      patch_type: "change_image",
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "multipart/form-data",
    };
    const successMsg = "Image changed successfully";
    updateUserInfo(data, headers, successMsg);
  };

  const changePassword = (values) => {
    setLoading(true);
    const data = {
      patch_type: "change_password",
      old_password: values.oldPassword,
      new_password: values.newPassword,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    const successMsg = "Password changed successfully";
    updateUserInfo(data, headers, successMsg);
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    setSelectedImg(selected);
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    }
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: schema,
    onSubmit: changePassword,
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6" sx={{ color: "#fd2020" }}>
        Change Profile Picture
      </Typography>
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: "10px",
          p: 2,
          // width: { md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{ position: "relative" }}
        >
          <Avatar
            src={imgPreview || user.image}
            sx={{ width: 70, height: 70, background: "#f7c12c" }}
          >
            <AddPhotoAlternateIcon />
          </Avatar>
          <AddPhotoAlternateIcon
            color="warning"
            sx={{
              position: "absolute",
              top: "60%",
              left: "60%",
            }}
          />
          <input type="file" name="image" onChange={handleImageChange} hidden />
        </IconButton>
        <Button
          onClick={changeProfileImg}
          variant="contained"
          color="success"
          size="small"
        >
          Save
        </Button>
      </Box>
      <Typography variant="h6" sx={{ color: "#fd2020" }}>
        Change Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          boxShadow: 3,
          p: 2,
          // width: { md: "50%" },
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Password
          size="small"
          label="Old Password"
          name="oldPassword"
          value={values.oldPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!touched.oldPassword && !!errors.oldPassword}
          helperText={touched.oldPassword && errors.oldPassword}
        />
        <Password
          size="small"
          label="New Password"
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!touched.newPassword && !!errors.newPassword}
          helperText={touched.newPassword && errors.newPassword}
        />
        <Box sx={{ pt: 2 }}>
          <Button disabled={loading} type="submit" variant="contained" disableElevation>
            Confirm
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
      </Box>
    </Box>
  );
};

export default ChangeProfile;
