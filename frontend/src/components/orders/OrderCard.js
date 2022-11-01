import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Status from "./Status";
import { useContext } from "react";
import { UserContext } from "../../GlobalContext";
import { axiosInstanceGeneral } from "../../axios/axios";
import { useEffect } from "react";
import DeleteConfirm from "./DeleteConfirm";

const statusChoices = {
  OT: ["Order Taken", 0],
  P: ["Preparing", 1],
  S: ["Shipped", 2],
  D: ["Delivered", 3],
};

function OrderCard({ item }) {
  const [showStatus, setShowStatus] = useState(false);
  const [arrowDownIcon, setArrowDownIcon] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [cancelExpired, setCancelExpired] = useState(false);
  const { cancellationTime } = useContext(UserContext);

  const handleClick = () => {
    setArrowDownIcon(!arrowDownIcon);
    setShowStatus(!showStatus);
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
        {item.cancelled || cancelled ? (
          <Chip size="small" label="Cancelled" />
        ) : (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Chip size="small" label={statusChoices[item.status][0]} />
            <Chip
              size="small"
              label="Cancel"
              disabled={cancelExpired}
              onDelete={() => setShowConfirm(true)}
            />
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
          </Box>
        )}
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
        <Box sx={{ display: "flex", justifyContent: "flex-end",px:2 }}>
          <Typography color="error" sx={{width:{xs:'30%',sm:'25%'}}}>Total: Rs{item.total}</Typography>
        </Box>
      </Box>
      <DeleteConfirm
        {...{ showConfirm, setShowConfirm, setCancelled }}
        id={item.id}
      />
    </Paper>
  );
}

export default OrderCard;
