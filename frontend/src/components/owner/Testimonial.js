import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Avatar, Rating } from "@mui/material";
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
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 200,
        variableWidth: false,

        cssEase: "ease-in-out",
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        variableWidth: true,
        cssEase: "ease-in-out",
      },
    },
  ],
};

const TestimonialCard = ({ review }) => {
  return (
    <Box
      sx={{
        height: 310,
        pb: 2,
        width: { xs: 300, md: 270 },
        mx: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
          position: "relative",
          height: "65%",
          width: "100%",
          p: 1.5,
          background: "linear-gradient(to bottom,#fff,#fcd2db, #e07b69)",
        }}
      >
        <Avatar
          alt={review.user.name}
          src={review.user.image}
          sx={{
            mt: 0.5,
            height: "100px",
            width: "100px",
            boxShadow: 3,
            ml: "5px",
            position: "absolute",
            zItems: 100,
            top: -62.5,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 125,
            alignItems: "center",
          }}
        >
          <Rating
            name="read-only"
            value={review.rate}
            sx={{ borderBottom: 2, borderColor: "#fff" }}
            readOnly
          />

          <Typography
            align="center"
            sx={{
              fontFamily: "Quicksand",
              fontSize: "16px",
              color: "#fff",
            }}
          >
            {review.message}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

function Testimonial() {
  const [reviews, setReviews] = useState();

  useEffect(()=>{
    axiosInstanceGeneral.get('api/reviews/')
    .then(res=>{
      if(res.status===200) setReviews(res.data);
    })
    .catch(err=>console.log(err))
  },[])


  return (
    <Box sx={{mt:4}}>
      <Box >
        <Box
          variant="h5"
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: "2.5rem", color: "#df2020" }}
          >
            Customer
          </Typography>
          <Typography variant="h5" sx={{ fontSize: "2.5rem", color: "black" }}>
            Reviews
          </Typography>
        </Box>
        <Box sx={{display:'flex',my:2, justifyContent:'center'}}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation 
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mb: 9,
          mt: -2,
        }}
      >
        <Slider {...settings}>
          {reviews?.map(review => (
            <TestimonialCard key={review.id}  review={review} />
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default Testimonial;
