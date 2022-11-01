import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";
import OfferCard from "./OfferCard";

function Offers() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    axiosInstanceGeneral
      .get("api/offers/")
      .then((res) => setOffers(res.data))
      .catch((err) => console.log("custom err", err));
  }, []);
  if (!offers.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        Stay tuned from exciting offers!
      </Typography>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        flexWrap: "wrap",
      }}
    >
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </Box>
  );
}

export default Offers;
