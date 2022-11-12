import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  OrdersPreparing,
  OrdersShipped,
  OrdersTaken,
} from "./CurrentOrdersDisplay";

function OrderList() {
  const [alignment, setAlignment] = useState("OT");
  const [loading, setLoading] = useState(false);
  const [OT, SetOT] = useState(0);
  const [P, SetP] = useState(0);
  const [S, SetS] = useState(0);
  const [orders, setOrders] = useState();

  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
  };

  const getTitle = () => {
    if (alignment === "OT") return "PLACED ORDERS";
    if (alignment === "P") return "ORDERS IN PREPARATION";
    if (alignment === "S") return "ORDERS SHIPPED";
  };
  const getStatusComponent = () => {
    if (alignment === "OT")
      return <OrdersTaken orders={orders} status={alignment} />;
    if (alignment === "P")
      return <OrdersPreparing orders={orders} status={alignment} />;
    if (alignment === "S")
      return <OrdersShipped orders={orders} status={alignment} />;
  };

  useEffect(() => {
    setLoading(true);
    const socket = new WebSocket("ws://localhost:8000/order-list/");
    socket.onopen = (e) => {
      socket.send(alignment);
    };
    socket.onmessage = (e) => {
      const payload = JSON.parse(e.data);
      SetOT(payload.OT);
      SetP(payload.P);
      SetS(payload.S);
      setOrders(payload.data);
      setLoading(false);
    };
    return () => {
      socket.close();
    };
  }, [alignment]);

  return (
    <Box sx={{ m: 2 }}>
      <ToggleButtonGroup
        color="warning"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <ToggleButton value="OT">PLACED({OT})</ToggleButton>
        <ToggleButton value="P">PREPARING({P})</ToggleButton>
        <ToggleButton value="S">SHIPPED({S})</ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="h6" color="error">
        {getTitle()}
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        {loading && <CircularProgress color="warning" />}
      </Box>
      {orders && !loading ? getStatusComponent() : null}
    </Box>
  );
}

export default OrderList;
