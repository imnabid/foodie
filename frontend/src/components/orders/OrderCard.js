import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  OutlinedInput,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Status from "./Status";
import { useContext } from "react";
import { UserContext } from "../../GlobalContext";
import { axiosInstanceGeneral } from "../../axios/axios";

const statusChoices = {
  OT: ["Order Taken", 0],
  P: ["Preparing", 1],
  S: ["Shipped", 2],
  D: ["Delivered", 4],
};

function OrderCard({ item, userReview, setUserReview }) {
  const [showStatus, setShowStatus] = useState(false);
  const [arrowDownIcon, setArrowDownIcon] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [reviewVal, setReviewVal] = useState(userReview.rate);
  const {  setShowSnackBar } = useContext(UserContext);

  const handleClick = () => {
    setArrowDownIcon(!arrowDownIcon);
    setShowStatus(!showStatus);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const msg = e.target.reviewMsg.value;
    axiosInstanceGeneral
      .post(
        "api/user-review/",
        {
          message: msg,
          rate: reviewVal,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        setUserReview({ rate: reviewVal, message: msg });
        setShowReview(false);
        setShowSnackBar({
          show: true,
          msg: res.data.status,
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Paper elevation={3} sx={{ p: 1, width: { xs: "90%", sm: "60%" } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">
            Order{" "}
            <Typography component="span" variant="h6" color="error">
              #{item.id}
            </Typography>
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "13px" }}>
            {item.date}
          </Typography>
        </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Chip size="small" label={statusChoices[item.status][0]} />
            <Button
              variant="outlined"
              endIcon={
                arrowDownIcon ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )
              }
              size="small"
              color="error"
              onClick={handleClick}
            >
              Status
            </Button>
            <Button color="warning" onClick={() => setShowReview(true)}>
              Review
            </Button>
          </Box>
      </Box>

      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Collapse in={showStatus && !item.cancelled}>
          {/* display order status bar */}
          <Status step={statusChoices[item.status][1]} />
        </Collapse>
        {item.food.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Avatar src={item.image} alt={item.name} />
            <Typography
              color="text.secondary"
              sx={{
                width: "50%",
                textOverflow: "ellipsis",
              }}
            >
              {item.name}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                width: "10%",
              }}
            >
              Qty:{item.quantity}
            </Typography>
            <Typography
              sx={{
                width: "20%",
                fontSize: "15px",
                textAlign: "center",
              }}
              color="text.secondary"
            >
              amt: Rs{item.price * item.quantity}
            </Typography>
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
          <Typography color="error" sx={{ width: { xs: "30%", sm: "25%" } }}>
            Total: Rs{item.total}
          </Typography>
        </Box>
        {showReview && (
          <Box
            component="form"
            onSubmit={handleReviewSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Typography variant="h6" color="error">
              {" "}
              Kindly rate our services and write a feedback
            </Typography>
            <Rating
              value={reviewVal}
              onChange={(event, newVal) => {
                setReviewVal(newVal);
              }}
            />
            <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
              <OutlinedInput
                color="warning"
                fullWidth
                size="small"
                name="reviewMsg"
                placeholder={userReview.message}
                sx={{
                  borderRadius: "12px",
                }}
              />
              <Button
                size="small"
                variant="contained"
                color="warning"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      {/* <DeleteConfirm
        {...{ showConfirm, setShowConfirm }}
        id={item.id}
      /> */}
    </Paper>
  );
}

export default OrderCard;
