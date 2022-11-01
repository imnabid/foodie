import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import {
  Box,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Carousel from "../components/home/Carousel";
import Categories from "../components/home/Categories";
import ComboCollection from "../components/home/ComboCollection";
import OfferCard from "../components/home/OfferCard";
import Offers from "../components/home/Offers";

// import TestmonialSlider from "../components/UI/slider/TestmonialSlider.jsx";
// import Popular_categories from "./Popular_categories";


export default function Home() {

  return (
    <Box sx={{ px: 5 }}>
      {/* <Intro /> */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Our{" "}
          <Typography variant="span" sx={{ color: "#df2020" }}>
            Services
          </Typography>
        </Typography>

        <Carousel />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Our{" "}
          <Typography variant="span" sx={{ color: "#df2020" }}>
            Offers
          </Typography>
        </Typography>

        <Offers />
      </Box>

      <ComboCollection />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Food{" "}
          <Typography variant="span" sx={{ color: "#df2020" }}>
            Categories
          </Typography>
        </Typography>
        <Categories />
      </Box>
    </Box>
  );
}
