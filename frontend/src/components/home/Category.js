import * as React from "react";
import { Box, Card, CardActionArea, Typography } from "@mui/material";

export default function ContainerResponsive({ item, handleClick }) {
  return (
    <Card
    onClick={()=>handleClick(item)}
      variant="outlined"
      sx={{
        width: 300,
        borderRadius:'12px',
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
        
      }}
    >
      <CardActionArea  sx={{p:2, borderRadius:'12px'}}>
      <Box
        component="img"
        src={item.image}
        alt="nothing"
        sx={{
          width: "100%",
          height: 150,
          objectFit: "cover",
        }}
      />

        <Box sx={{ pt:2, display: "flex", justifyContent: "space-between", alignItems:'center' }}>
          <Box>
            <Typography
              fontWeight="lg"
              sx={{ color: "#fd2020", fontSize: "1.2rem" }}
            >
              {item.category_name}
            </Typography>
          </Box>
            <Typography variant='body2'  color='text.secondary'>
              starts @{item.starts_at}
            </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
