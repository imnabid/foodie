import { Box, Typography } from "@mui/material";
import React from "react";

function Serve({ name, image }) {
  return (
    <Box
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:1,
        backgroundColor: "#fde4e4",
        borderRadius: "15px",
        px: 2,
        py: 2,
        width: "20vw",
        transition: "0.4s",
        "&:hover": {
          transform: "translateY(-15px)",
        },
      }}
    >
      <img src={image} alt="category__item"  width='50px'/>
      <Typography variant='h6' sx={{fontSize:'1.1rem'}}>{name}</Typography>
    </Box>
  );
}

export default Serve;
