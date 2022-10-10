import { AspectRatio } from "@mui/joy";
import { Card, CardActionArea, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import image from "../../images/combo.jpg";

function ComboCard({ combo }) {
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    let sum = 0;
    combo.items.forEach(item => {
      sum += item.price      
    });
    setTotal(sum)

  },[])

  return (
    <Card
    variant='outlined'
      sx={{
        width: { sm: "200px", xs: "150px" },
        borderRadius: "12px",

        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
      }}
    >
      <CardActionArea sx={{ height:200, p: 1, borderRadius: "12px" }}>
        <AspectRatio>
          <img src={image} alt="none" />
        </AspectRatio>
        <Typography  sx={{ color: "#fd2020", fontSize: "1.1rem",mt:0.5 }}>
          {combo.name}
        </Typography>
        <Typography variant="text.secondary" sx={{ fontSize: "0.9rem" }}>
          Total: Rs{total}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default ComboCard;
