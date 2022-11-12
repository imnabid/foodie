import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../../GlobalContext";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";

function CartDrawer({ showCart, setShowCart }) {
  const navigate = useNavigate();
  const { cartItems, setCartItems, setShowSnackBar } = useContext(UserContext);

  const deleteCartItem = (id) => {
    let newItems = cartItems.items.filter((item) => item.id !== id);
    setCartItems((prev) => {
      return { ...prev, items: newItems, num: newItems.length };
    });
  };

  const closeCart = () => {
    setShowCart(false);
  };
  const handleCheckout = () => {
    if (!cartItems.items.length) {
      return setShowSnackBar({
        show: true,
        msg: "Add items to cart first",
        type: "error",
      });
    }
    navigate("checkout");
    closeCart();
  };
  return (
    <Drawer anchor="right" open={showCart} onClose={closeCart}>
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
            <IconButton size="large" onClick={closeCart}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography
            sx={{ mx: 2, display: "flex", alignItems: "center" }}
            variant="h6"
            color="error"
          >
            <ShoppingCartOutlinedIcon /> Cart Items
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
            {cartItems.items.length ? (
              cartItems.items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 0.5,
                    boxShadow: 4,
                    borderRadius: "10px",
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Avatar alt={item.name} src={item.image} />
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant='h6' color="error" sx={{fontSize:'18px'}}>{item.name}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => deleteCartItem(item.id)}
                      >
                        <CloseIcon sx={{ fontSize: "18px" }} />
                      </IconButton>
                    </Box>
                    <Typography variant='body2' color="text.secondary">
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
        <Button
          onClick={handleCheckout}
          color="error"
          size="small"
          variant="contained"
          sx={{
            m: 2,
            fontSize:'15px',
            fontWeight:'bold'
          }}
        >Checkout
        </Button>
      </Box>
    </Drawer>
  );
}

export default CartDrawer;
