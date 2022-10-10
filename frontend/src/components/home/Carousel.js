import React from "react";
import Slider from "react-slick";
import CarouItem from "./CarouItem";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import one from "../../images/home/icecream.jpg";
import two from "../../images/home/chickenoffer.jpg";
import three from "../../images/home/biryanioffer.jpg";
import four from "../../images/home/burgeroffer.png";
import five from "../../images/home/momooffer.png";
import test from "../../images/home/test.jpg";
const settings = {
  dots: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  cssEase: "ease-in-out",
  variableWidth: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 300,
        variableWidth: false,
        cssEase: "linear",
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        speed: 1000,
        variableWidth: true,
        cssEase: "ease-in-out",
      },
    },
  ],
};

const items = [
  { img: one },
  { img: test },
  { img: two },
  { img: three },
  { img: four },
  { img: five },
];
function Carousel() {
  return (
    <Slider {...settings}>
      {items.map((item, i) => (
        <CarouItem key={i} img={item.img} />
      ))}
    </Slider>
  );
}

export default Carousel;
