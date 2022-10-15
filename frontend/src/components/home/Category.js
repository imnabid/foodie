import * as React from "react";
import image from "../../images/home/sekwa.jpg";
import { Box, Card, CardActionArea, Rating, Typography } from "@mui/material";

export default function ContainerResponsive({ name, handleClick }) {
  return (
    <Card
    onClick={handleClick}
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
        src={image}
        alt="nothing"
        sx={{
          width: "100%",
          height: "70%",
          objectFit: "cover",
        }}
      />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              fontWeight="lg"
              mt={2}
              sx={{ color: "#fd2020", fontSize: "1.2rem" }}
            >
              {name}
            </Typography>
            <Typography variant="body3" color='text.secondary'>
              starts @200
            </Typography>
          </Box>
          <Rating
            sx={{ display: "flex", alignItems: "center" }}
            defaultValue={0}
            name="read-only"
            value={2}
            readOnly
            size="small"
          />
        </Box>
      </CardActionArea>
    </Card>
  );
}
