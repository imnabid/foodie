import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GppGoodIcon from "@mui/icons-material/GppGood";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import {
  Grid,
  Box,
  Typography,
  Button,
  CardMedia,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Intro from "../components/home/Intro";
import Serve from "../components/home/Serve";
import Carousel from "../components/home/Carousel";
import Categories from "../components/home/Categories";
import ModalWrapper from "../components/ModalWrapper";
import ModalLg from "../components/home/ModalLg";
import ComboModal from "../components/home/ComboModal";
import ComboCollection from "../components/home/ComboCollection";
import OfferCard from "../components/home/OfferCard";
import OfferCardCollection from "../components/home/OfferCardCollection";

// import TestmonialSlider from "../components/UI/slider/TestmonialSlider.jsx";
// import Popular_categories from "./Popular_categories";

const displayCategories = [
  { name: "Asian Food", imgUrl: "Category1.png" },
  { name: "Thai Food", imgUrl: "Category2.png" },
  { name: "Chinese Food", imgUrl: "Category3.png" },
  { name: "Nepali Food", imgUrl: "Category4.png" },
];

export default function Home() {
  return (
    <Box sx={{ px: 5 }}>
      {/* <Intro /> */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Our{" "}
          <Typography variant="span" sx={{ color: "#df2020" }}>
            Offers
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

        <OfferCardCollection/>
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
