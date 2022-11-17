import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";
import { UserContext } from "../../GlobalContext";
import ComboCard from "./ComboCard";
import blue from '../../images/combo/blue.png'
import black from '../../images/combo/black.jpg'
import green from '../../images/combo/green.png'
import pink from '../../images/combo/pink.png'

const IMAGES = {
  0:pink,
  1:blue,
  2:black,
  3:green
}

function ComboCollection() {
  const { combos, setCombos,comboChange,setComboChange, user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axiosInstanceGeneral
        .get(`api/combo/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          setCombos(res.data);

        })
        .catch((err) => console.log(err));
    }
  }, [user,comboChange]);

  return (
    <>
      {user && combos.length ? (
        <Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Your{" "}
              <Typography variant="span" sx={{ color: "#df2020" }}>
                Combos
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", gap: { xs: 1, md: 2 }, flexWrap: "wrap" }}
          >
            {combos.map((combo, i) => (
              <ComboCard key={combo.name} combo={combo} image={IMAGES[i%4]}/>
            ))}
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
export default ComboCollection;
