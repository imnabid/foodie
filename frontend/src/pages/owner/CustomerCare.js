import { Box, Typography } from "@mui/material";
import ReviewCard from "../../components/owner/ReviewCard";
import { useState } from "react";
import { useEffect } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";

const CustomerCare = () => {
  const [reviews, setReviews] = useState();

  useEffect(() => {
    axiosInstanceGeneral
      .get("api/reviews/",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then((res) => {
        if (res.status === 200) setReviews(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ p: 2, ml: { md: 5 } }}>
      <Typography variant="h4" sx={{ fontSize: { xs: 25, md: 35 } }}>
        CUSTOMER <span style={{ color: "#f7c12c" }}>REVIEW WALL</span>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
          width: { xs: "100%", md: "60%" },
        }}
      >
        {reviews?.map((review) => {
          return (
            <ReviewCard
            key={review.id}
            review={review}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CustomerCare;
