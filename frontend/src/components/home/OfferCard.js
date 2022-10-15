import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import React from "react";
import image from "../../images/momo.jpg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function OfferCard() {
  return (
    <Box
      sx={{
        width: { xs: 150, sm: 200 },
        height: 200,
        borderRadius: "12px",
        position: "relative",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
      }}
    >
        <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p:1,
          position: "absolute",
          width:'90%',
          zIndex: 50,
        }}
      >
      <Chip
        size="small"
        sx={{
          borderRadius:'5px'
        }}
        label="20% off"
        color="warning"
      />
      <Chip
        size="small"
        onClick={()=>console.log('hi')}
        label={<AddShoppingCartIcon sx={{fontSize:'20px'}} />}
        sx={{
          borderRadius:'5px'
        }}
        color='warning'
      />
      </Box>
        
    
      <Box
        component="img"
        src={image}
        alt="nothing"
        sx={{
          width: "100%",
          height: "70%",
          objectFit: "cover",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", m: 0.5 }}>
        <Typography color="error" variant="h6" sx={{ fontSize: "18px" }}>
          Buff Momo
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
          <Typography
            color="text.secondary"
            sx={{ fontSize: "14px", textDecoration: "line-through" }}
          >
            Rs200
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "14px" }}>
            Rs160
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default OfferCard;
