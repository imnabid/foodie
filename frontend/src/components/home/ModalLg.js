import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext } from "react";
import { closeModalContext } from "../ModalWrapper";
import { UserContext } from "../../GlobalContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function ModalLg({ data, initialFood }) {
  //initial food is used to show selected food on search
  const navigate = useNavigate();
  const { menuItems, category_name, description, image } = data;
  const [food, setFood] = useState(initialFood);
  const [quantity, setQuantity] = useState(1);
  const [chipItems, setChipItems] = useState([]);
  const [note, setNote] = useState("");
  const { cartItems, setCartItems, setShowSnackBar } = useContext(UserContext);
  const { handleClose } = useContext(closeModalContext); //to close the modal when add to cart is clicked

  useEffect(() => {
    //to add an item when item is clicked through searchbar
    if (initialFood.name) {
      setChipItems([{ ...food, quantity: 1 }]);
    }
  }, []);
  const addToCart = () => {
    if (!chipItems.length) {
      setShowSnackBar({
        show: true,
        msg: "choose an item first",
        type: "error",
      });
      return;
    }
    // to handle repeated additions
    let items = cartItems.items;
    let currentItems = chipItems;
    let indicesToPop = [];
    currentItems.forEach((item, index) => {
      items.forEach((i) => {
        if (item.name === i.name) {
          i.quantity += item.quantity;
          indicesToPop.push(index);
        }
      });
    });
    currentItems = currentItems.filter((e, i) => !indicesToPop.includes(i));
    items = items.concat(currentItems);
    handleClose();
    setCartItems((prev) => {
      return { ...prev, note: note, items: items, num: items.length };
    });
    setShowSnackBar({
      show: true,
      msg: "items added to cart",
      type: "success",
    });
  };

  const handleCheckout = () => {
    if (!chipItems.length) {
      setShowSnackBar({
        show: true,
        msg: "choose an item first",
        type: "error",
      });
      return;
    }
    addToCart();
    navigate("checkout");
  };

  const deQuantity = () => {
    if (quantity <= 1) {
      setQuantity(1);
      return;
    }
    setQuantity(quantity - 1);
  };
  const inQuantity = () => {
    if (quantity >= 5) {
      setQuantity(5);
      return;
    }
    setQuantity(quantity + 1);
  };

  const addItem = () => {
    if (!food.name) {
      setShowSnackBar({
        show: true,
        msg: "choose an item first",
        type: "error",
      });
      return;
    }
    setChipItems((prev) => {
      const temp = prev.filter((item) => item.name !== food.name);
      return [...temp, { ...food, quantity }];
      // return [...temp, { name: food.name, quantity, price: food.price }];
    });
  };

  const handleChipDelete = (name) => {
    setChipItems(chipItems.filter((item) => item.name !== name));
  };

  const handleChange = (event) => {
    const id = event.target.value;
    const food = menuItems.find((item) => item.id === id);
    setFood(food);
    setQuantity(1);
  };

  const calculateTotal = () => {
    if (chipItems.length === 0) {
      return 0;
    }
    let total = 0;
    chipItems.forEach((item) => (total += item.price * item.quantity));
    return total;
  };

  //category modal
  return (
    <Grid container>
      <Grid item sm={4} sx={{ px: 2, mt: { xs: 2, sm: 0 } }}>
        <Card
          sx={{
            boxShadow: { xs: 0, sm: 3 },
            height: { xs: "250px", sm: "90%" },
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt="green iguana"
            sx={{ height: "140px" }}
          />
          <CardContent sx={{ px: { xs: 0, sm: 2 } }}>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={8} sx={{ px: 2, mt: { xs: 2, sm: 0 } }}>
        <Typography variant="h5" sx={{ color: "#fd2020" }}>
          {category_name}
        </Typography>
        <Box>
          <FormControl
            sx={{ width: { xs: "100%", sm: "80%" }, mt: 1 }}
            size="small"
          >
            <InputLabel id="demo-select-small" color="error">
              choose an item
            </InputLabel>
            <Select
              color="error"
              fullWidth
              labelId="demo-select-small"
              id="demo-select-small"
              value={food.id ? food.id : ""}
              label="choose an item"
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {menuItems.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography>{item.name}</Typography>
                    <Typography>Rs{item.price}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1 }}>
            <IconButton onClick={deQuantity}>
              <RemoveIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton onClick={inQuantity}>
              <AddIcon />
            </IconButton>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={addItem}
              endIcon={<AddIcon />}
              sx={{
                borderRadius: "12px",
              }}
            >
              Add
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              mt: 2,
              gap: 1,
              height: 100,
            }}
          >
            {chipItems.length ? (
              chipItems.map((item) => (
                <Chip
                  key={item.name}
                  label={`${item.name} x${item.quantity}`}
                  color="warning"
                  variant="outlined"
                  onDelete={() => handleChipDelete(item.name)}
                />
              ))
            ) : (
              <Typography varinat="body2" sx={{ color: "lightgrey" }}>
                No items added!
              </Typography>
            )}
          </Box>
          <Box>
            <Typography variant="h6" color="text.secondary">
              Total: Rs{calculateTotal()}
            </Typography>
          </Box>
          <OutlinedInput
            placeholder="Leave Note(optional)"
            fullWidth
            color="error"
            onChange={(e) => setNote(e.target.value)}
            size="small"
            sx={{ fontSize: "14px", height: "1.5rem", mt: 1 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              mt: 5,
            }}
          >
            <Button
              fullWidth
              size="small"
              variant="contained"
              onClick={addToCart}
              sx={{
                borderRadius: "12px",
              }}
            >
              Add to Cart
            </Button>
            <Button
              fullWidth
              size="small"
              variant="contained"
              sx={{
                borderRadius: "12px",
              }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ModalLg;
