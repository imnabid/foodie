import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { UserContext } from "../../GlobalContext";

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

const menuItems = [
  { id: 1, name: "Chicken Cmomo", price: 150 },
  { id: 2, name: "Chicken Pizza", price: 250 },
  { id: 3, name: "Roast", price: 50 },
  { id: 4, name: "Plain momo", price: 250 },
];
const Categories = [
  { id: 1, name: "Chicken " },
  { id: 2, name: "Momo" },
  { id: 3, name: "Pizza" },
  { id: 4, name: "Veggies" },
];
function ComboModal({setShowCreateCombo, setShowModal}) {
  const [category, setCategory] = useState({});
  const [comboName, setcomboName] = useState("");
  const [food, setFood] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const { setCombos, setShowSnackBar } = useContext(UserContext);

  const saveCombo = ()=>{
    
    setCombos((prev)=>[...prev, {name:comboName,items:selectedItems}])
    setShowSnackBar({
      show: true,
      msg: "combo added successfully",
      type: "success",
    });
    setShowCreateCombo(false);
    setShowModal(false);

  }

  const handleCategoryChange = (event) => {
    const id = event.target.value;
    const category = Categories.find((item) => item.id === id);
    setCategory(category);
  };
  const handleChange = (event) => {
    const id = event.target.value;
    const food = menuItems.find((item) => item.id === id);
    setFood(food);
    // setQuantity(1);
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
    setSelectedItems((prev) => {
      const temp = prev.filter((item) => item.name !== food.name);
      return [...temp, { name: food.name, quantity, price: food.price }];
    });
    
  };
  const handleChipDelete = (name) => {
    setSelectedItems(selectedItems.filter((item) => item.name !== name));
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: "column",
        alignItems: "center",
        px: 2,
      }}
    >
      <TextField
          required
          fullWidth
          size="small"
          id="outlined-basic"
          label="Enter a combo name"
          variant="outlined"
          onChange={(e)=>setcomboName(e.target.value)}
          sx={{width: { xs: "100%", sm: "80%" }, mt: 1 }}
        />
      <FormControl
        sx={{ width: { xs: "100%", sm: "80%" }, mt: 1 }}
        size="small"
      >
        
        <InputLabel id="demo-select-small">choose a category</InputLabel>
        <Select
          required
          fullWidth
          labelId="demo-select-small"
          id="demo-select-small"
          value={category.id ? category.id : ""}
          label="choose category"
          onChange={handleCategoryChange}
          MenuProps={MenuProps}
        >
          {Categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography>{item.name}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{ width: { xs: "100%", sm: "80%" }, mt: 1 }}
        size="small"
      >
        <InputLabel id="demo-select-small">choose an item</InputLabel>
        <Select
         required
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
          sx={{ borderRadius: "12px" }}
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
        {selectedItems.length ? (
          selectedItems.map((item) => (
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "80%",
          gap: 2,
          mt: 2,
        }}
      >
        <Button fullWidth size="small" variant="contained" color="success" onClick={saveCombo}>
          Save Combo!
        </Button>
      </Box>
    </Box>
  );
}

export default ComboModal;
