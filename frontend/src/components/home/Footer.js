import { Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import logo from "../../images/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";
import { UserContext } from "../../GlobalContext";

function Footer() {
  const [businessInfo, setBusinessInfo] = useState();
  const { setDeliveryCharge } = useContext(UserContext);

  useEffect(() => {
    axiosInstanceGeneral
      .get("api/business-info/")
      .then((res) => {
        setBusinessInfo(res.data);
        setDeliveryCharge(res.data.delivery_charge);
      })
      .catch((err) => console.log(err));
  }, [setDeliveryCharge]);

  return (
    <Box
      sx={{
        mt: 3,
        p: 4,
        py: { md: 6 },
        background: "linear-gradient(to bottom, #faeded, #fde4e4)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },

          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            flex: 2,
            p: 1,
          }}
        >
          <Box
            component="img"
            src={logo}
            sx={{
              height: 50,
            }}
          />
          <Typography sx={{ fontSize: 15, color: "#36454F" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            pariatur accusamus
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 1,
          }}
        >
          <Typography variant="h6" color="error" sx={{ fontWeight: "bold" }}>
            Delivery Time
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: 17, color: "#36454F", fontWeight: "bold" }}
          >
            Sunday - Friday
          </Typography>
          <Typography sx={{ fontSize: 15, color: "#36454F" }}>
            {businessInfo?.service_hrs}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 1,
          }}
        >
          <Typography variant="h6" color="error" sx={{ fontWeight: "bold" }}>
            Contact
          </Typography>
          <Typography variant="h6" sx={{ fontSize: 17, color: "#36454F" }}>
            {businessInfo?.address}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: 17, color: "#36454F", fontWeight: "bold" }}
          >
            Phone:{businessInfo?.contact}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: 17, color: "#36454F", fontWeight: "bold" }}
          >
            Email:{businessInfo?.email}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 1,
          }}
        >
          <Typography variant="h6" color="error" sx={{ fontWeight: "bold" }}>
            Follow Us:
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Link href={businessInfo?.fb}>
              <FacebookIcon
                color="error"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Link>
            <Link href={businessInfo?.insta}>
              <InstagramIcon
                color="error"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Link>
          </Box>
        </Box>
      </Box>
      <Typography variant="body3" color="text.secondary" sx={{ px: 1 }}>
        Copyright reserved ©Foodie, 2022
      </Typography>
    </Box>
  );
}

export default Footer;
