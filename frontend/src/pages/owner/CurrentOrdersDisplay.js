import { Box, Typography } from "@mui/material";
import React from "react";
import OrderListCard from "./OrderListCard";

export function OrdersTaken({ orders, status }) {
  return (
    <>
      {orders.length ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {orders.map((order) => {
            return (
              <OrderListCard key={order.id} item={order} status={status} />
            );
          })}
        </Box>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No orders at this state
        </Typography>
      )}
    </>
  );
}
export function OrdersPreparing({ orders, status }) {
  return (
    <>
      {orders.length ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {orders.map((order) => {
            return (
              <OrderListCard key={order.id} item={order} status={status} />
            );
          })}
        </Box>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No orders at this state
        </Typography>
      )}
    </>
  );
}
export function OrdersShipped({ orders, status }) {
  return (
    <>
      {orders.length ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {orders.map((order) => {
            return (
              <OrderListCard key={order.id} item={order} status={status} />
            );
          })}
        </Box>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No orders at this state
        </Typography>
      )}
    </>
  );
}
