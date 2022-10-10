import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../GlobalContext";
import ComboCard from "./ComboCard";

function ComboCollection() {
  const { combos } = useContext(UserContext);

  if(combos.length){
  return (
    <>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Your{" "}
          <Typography variant="span" sx={{ color: "#df2020" }}>
            Combo
          </Typography>
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {combos.map((combo) => (
          <ComboCard key={combo.name} combo={combo} />
        ))}
      </Box>
    </>
  );}
  return ('');
}

export default ComboCollection;
