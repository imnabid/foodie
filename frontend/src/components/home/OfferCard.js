import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { UserContext } from "../../GlobalContext";

function OfferCard({ offer }) {
  const { id, food, discount_percent, price_before } = offer;
  const { cartItems, setCartItems, setShowSnackBar } = useContext(UserContext);
  const addToCart = () => {
    let selectedFood = food;
    selectedFood.quantity = 1;
    let items = cartItems.items;
    let pushItem = true;

    items.forEach((i) => {
      if (i.id === selectedFood.id) {
        i.quantity += 1;
        pushItem = false;
      }
    });
    if (pushItem) {
      items.push(selectedFood);
    }

    setCartItems((prev) => {
      return { ...prev, items: items, num: items.length };
    });
    setShowSnackBar({
      show: true,
      msg: "item added to cart",
      type: "success",
    });
  };
  return (
    <Box
      sx={{
        width: { xs: 150, sm: 200 },
        height: 200,
        borderRadius: "12px",
        position: "relative",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          position: "absolute",
          width: "90%",
          zIndex: 50,
        }}
      >
        <Chip
          size="small"
          sx={{
            borderRadius: "5px",
          }}
          label={`${discount_percent}% off`}
          color="warning"
        />
        <Chip
          size="small"
          onClick={addToCart}
          label={<AddShoppingCartIcon sx={{ fontSize: "20px" }} />}
          sx={{
            borderRadius: "5px",
          }}
          color="warning"
        />
      </Box>

      <Box
        component="img"
        src={food.image}
        alt={food.name}
        sx={{
          width: "100%",
          height: "70%",
          objectFit: "cover",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", m: 0.5 }}>
        <Typography
          color="error"
          variant="h6"
          sx={{ fontSize: { xs: "14px", sm: "18px" } }}
        >
          {food.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              textDecoration: "line-through",
            }}
          >
            Rs{price_before}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
          >
            Rs{parseInt(price_before * (1 - discount_percent / 100))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default OfferCard;
