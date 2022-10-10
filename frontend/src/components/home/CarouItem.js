import { Box, Card } from "@mui/material";
import React from "react";

function CarouItem({ img }) {
  return (
    <Box
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        mx:1
        
      }}
    >
      <Box component='img' src={img} sx={{
        // maxWidth:{xs:'100%',md:'20vw'},
        height:300
      }} />
    </Box>
  );
}

export default CarouItem;
