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
import { axiosInstanceGeneral } from "../../axios/axios";
import { useEffect } from "react";

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

function ComboModal({ setShowCreateCombo, setShowModal }) {
  const [category, setCategory] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [comboName, setcomboName] = useState("");
  const [food, setFood] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const { user, categories, combos, comboChange, setComboChange, setShowSnackBar } =
    useContext(UserContext);

  useEffect(() => {
    setFood({}); //so that when category is changed item selection is reset
    if (category.id) {
      axiosInstanceGeneral
        .get(`api/category-foods/${category.id}/`)
        .then((res) => {
          setMenuItems(res.data);
        })
        .catch((err) => console.log("custom err", err));
    }
  }, [category]);

  const saveCombo = (e) => {
    e.preventDefault();
    let error = false;
    combos.forEach((combo) => {
      if (combo.name.toLowerCase() === comboName.toLowerCase()) {
        setShowSnackBar({
          show: true,
          msg: "combo name already exists",
          type: "error",
        });
        error = true;
      }
    });
    if (error) {
      //return if combo name already exits
      return;
    }
    //store the combo in the database
    let comboItems = [];

    const postComboItems = async () => {
      for (let i = 0; i < selectedItems.length; i++) {
        try {
          const res = await axiosInstanceGeneral.post(
            "api/add-combo-item/",
            {
              food: selectedItems[i].id,
              quantity: selectedItems[i].quantity,
            },
            {
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          comboItems.push(res.data.id);
        } catch (err) {
          console.log("custom err", err.response);
        }
      }
    };

    const postCombo = async () => {
      const res = await postComboItems();
      //posting comboItems in Combo table
      axiosInstanceGeneral
        .post(
          "api/combo/",
          {
            name: comboName,
            items: comboItems,
          },
          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          setShowSnackBar({
            show: true,
            msg: res.data.status,
            type: "success",
          });
          setComboChange(!comboChange);
          
        })
        .catch((err) => console.log(err.response.data));
    };

    postCombo();
    setShowCreateCombo(false);
    setShowModal(false);
  };

  const handleCategoryChange = (event) => {
    const id = event.target.value;
    const category = categories.find((item) => item.id === id);
    setCategory(category);
  };
  const handleChange = (event) => {
    const id = event.target.value;
    const food = menuItems.find((item) => item.id === id);
    setFood(food);
    setQuantity(1);
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
      return [...temp, { ...food, quantity }];
    });
  };
  const handleChipDelete = (name) => {
    setSelectedItems(selectedItems.filter((item) => item.name !== name));
  };

  return (
    <Box
      component="form"
      onSubmit={saveCombo}
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
        onChange={(e) => setcomboName(e.target.value)}
        sx={{ width: { xs: "100%", sm: "80%" }, mt: 1 }}
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
          {categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography>{item.category_name}</Typography>
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
          {menuItems.length
            ? menuItems.map((item) => (
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
              ))
            : ""}
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
        <Button
          fullWidth
          type="submit"
          size="small"
          variant="contained"
          color="success"
        >
          Save Combo!
        </Button>
      </Box>
    </Box>
  );
}

export default ComboModal;
