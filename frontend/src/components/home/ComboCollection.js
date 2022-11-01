import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";
import { UserContext } from "../../GlobalContext";
import ComboCard from "./ComboCard";

function ComboCollection() {
  const { combos, setCombos,comboChange,setComboChange, user } = useContext(UserContext);

  // useEffect(()=>{
  //   console.log('combo', combos)
  // },[combos])    

  useEffect(() => {
    if (user) {
      axiosInstanceGeneral
        .get(`api/combos/${user.id}/`, {
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
                Combo
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", gap: { xs: 1, md: 2 }, flexWrap: "wrap" }}
          >
            {combos.map((combo) => (
              <ComboCard key={combo.name} combo={combo} />
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
