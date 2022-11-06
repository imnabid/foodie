import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import CarouItem from "./CarouItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { axiosInstanceGeneral } from "../../axios/axios";
const settings = {
  dots: true,
  slidesToShow: 1,
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

function Carousel() {
  const [items, setItems] = useState();

  useEffect(() => {
    if (!items) {
      axiosInstanceGeneral
        .get("api/images/")
        .then((res) => {
          setItems(res.data);
        })
        .catch((err) => console.log("custom err", err));
    }
  }, [items]);
  return (
    <Slider {...settings}>
      {items?.map((item, i) => (
        <CarouItem key={item.id} img={item.image} />
      ))}
    </Slider>
  );
}

export default Carousel;
