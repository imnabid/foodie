import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  Rating,
  Button,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { axiosInstanceGeneral } from "../../axios/axios";
import { useState } from "react";

function ReviewCard({ review }) {
  const [approved, setApproved] = useState(review.approved);

  const handleReview = (id) => {
    axiosInstanceGeneral
      .patch(
        `api/reviews/${id}/`,
        {
          approved: !approved,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setApproved((prev) => !prev);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card elevation={3}>
      <CardHeader
        sx={{ borderBottom: "1px solid lightgrey", m: 0, p: 0.5 }}
        avatar={<Avatar alt={review.user.name} src={review.user.image} />}
        title={review.user.name}
        subheader={
          <Rating name="read-only" value={review.rate} readOnly size="small" />
        }
      />
      <CardContent sx={{ m: 0, p: 0.5 }}>
        <Typography variant="body3" color="text.secondary">
          {review.message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color={approved ? "error" : "success"}
          onClick={() => handleReview(review.id)}
        >
          {approved ? "Unpost" : "Post"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ReviewCard;
