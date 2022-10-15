import { Avatar, Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import image from "../images/login.jpg";
import { UserContext } from "../GlobalContext";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect } from "react";
import { flexbox } from "@mui/system";
import { Link } from "react-router-dom";
function CartDrawer({ showCart, setShowCart }) {
  const { cartItems, setCartItems } = useContext(UserContext);
  const deleteCartItem = (name) => {
    let newItems = cartItems.items.filter((item) => item.name !== name);
    setCartItems((prev) => {
      return { ...prev, items: newItems, num: newItems.length };
    });
  };

  return (
    <Drawer anchor="right" open={showCart} onClose={() => setShowCart(false)}>
      <Box
        sx={{
          width: { xs: "100vw", sm: "50vw", md: "30vw" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box>
            <IconButton size="large" onClick={() => setShowCart(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography sx={{ mx: 2, display:'flex', alignItems:'center' }} variant="h6" color="error">
           <ShoppingCartOutlinedIcon/> Cart Items
          </Typography>
          <Box>
            {cartItems.items.length ? (
              cartItems.items.map((item) => (
                <Box
                  key={item.name}
                  sx={{
                    mx: 2,
                    my: 1,
                    p: 1.2,
                    boxShadow:2,
                    borderRadius: "10px",
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Avatar alt="Remy Sharp" src={image} />
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography color="error">{item.name}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => deleteCartItem(item.name)}
                      >
                        <CloseIcon sx={{ fontSize: "17px" }} />
                      </IconButton>
                    </Box>
                    <Typography color="text.secondary">
                      x{item.quantity} price: Rs{item.price * item.quantity}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography sx={{ m: 2 }} variant="h6" color="text.secondary">
                No items in Cart
              </Typography>
            )}
          </Box>
        </Box>
        <Button color='error' size='small' variant ='contained' sx={{
          m:2
        }}  >
          <Typography>Checkout</Typography>
          </Button>
      </Box>
    </Drawer>
  );
}

export default CartDrawer;
