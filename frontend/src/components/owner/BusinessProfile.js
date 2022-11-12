import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Button} from "@mui/material";
import ProfileText from "./ProfileText";
import InstagramIcon from "@mui/icons-material/Instagram";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ModalWrapper from "../ModalWrapper";
import AddCarouselImg from "./AddCarouselImg";
import { axiosInstanceGeneral } from "../../axios/axios";
import { useContext } from "react";
import { UserContext } from "../../GlobalContext";

const BusinessProfile = () => {
  const [businessInfo, setBusinessInfo] = useState();
  const [showModal, setShowModal] = useState(false);
  
  const {setShowSnackBar} = useContext(UserContext);

  useEffect(() => {
    getPostInfo(true);
  }, []);

  const getPostInfo = (getInfo, data) => {
    axiosInstanceGeneral
      .request({
        url:'api/business-info/',
        method: getInfo ? "get" : "patch",
        headers: {
          Authorization: getInfo
            ? "none"
            : `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: data,
      })
      .then((res) => {setBusinessInfo(res.data)
      if(!getInfo) setShowSnackBar({
        show:true,
        msg:'update successful',
        type:'success'
      })
      })
      .catch((err) => console.log("custom err", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const t = e.target;
    
    const data = {
      service_hrs: t.servicehrs.value,
      contact: t.contactno.value,
      address: t.address.value,
      email: t.email.value,
      delivery_charge: t.deliveryfee.value,
      fb: t.fb.value,
      insta: t.insta.value,
    };
    getPostInfo(false, data);
  };

  const handleAddCarouselImages = () => {
    setShowModal(true);
  };

  

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        boxShadow: 3,
        borderRadius: "10px",
        flexDirection: "column",
        gap: 1.5,
        width:{md:'80%'}
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h6">
          BUSINESS <span style={{ color: "#f7c12c" }}>INFORMATION</span>
        </Typography>
      </Box>
      {
        businessInfo &&
        <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <ProfileText
              fullWidth
              label="Service Hrs"
              name="servicehrs"
              defaultVal={businessInfo.service_hrs}
              icon={AccessTimeOutlinedIcon}
              edit="Service Hours"
            />
            <ProfileText
              fullWidth
              label="Contact No."
              name="contactno"
              defaultVal={businessInfo.contact}
              type="number"
              icon={PhoneAndroidIcon}
              edit="Contact No."
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <ProfileText
              label="Address"
              name="address"
              defaultVal={businessInfo.address}
              icon={LocationOnIcon}
              edit="Address"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <ProfileText
              label="Email"
              name="email"
              defaultVal={businessInfo.email}
              type="email"
              icon={EmailIcon}
              edit="Email"
            />
            <ProfileText
              label="Delivery fee"
              name="deliveryfee"
              defaultVal={businessInfo.delivery_charge}
              icon={DeliveryDiningIcon}
              edit="Delivery fee"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <ProfileText
              label="Facebook Link "
              name="fb"
              defaultVal={businessInfo.fb}
              icon={FacebookIcon}
              edit="Facebook Link"
            />
            <ProfileText
              label="Instagram Link"
              name="insta"
              defaultVal={businessInfo.insta}
              icon={InstagramIcon}
              edit="Instagram Link"
            />
          </Box>
        </Box>
      }
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between", md: "flex-start" },
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<PhotoCamera />}
          onClick={handleAddCarouselImages}
          component="label"
        >
          CAROUSEL IMAGES
        </Button>

        <Button variant="contained" type="submit">
          SAVE
        </Button>
      </Box>
      <ModalWrapper
        show={showModal}
        setShow={setShowModal}
        setShowCombo={() => false} //dummy function
      >
        <AddCarouselImg />
      </ModalWrapper>
    </Box>
  );
};

export default BusinessProfile;
