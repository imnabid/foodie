import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";
import { UserContext } from "../../GlobalContext";
import AddItemCommon from "./AddItemCommon";

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
const AddFoodModal = ({ setItems, setShowModal }) => {
  const [imgPreview, setImgPreview] = useState();
  const [selectedImg, setSelectedImg] = useState();
  const { setShowSnackBar } = useContext(UserContext);
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    axiosInstanceGeneral
      .get("api/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("custom err", err));
  }, []);

  const handleCategoryChange = (event) => {
    const id = event.target.value;
    const category = categories.find((item) => item.id === id);
    setCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImg) {
      setShowSnackBar({
        show: true,
        msg: "img is required",
        type: "error",
      });
      return;
    }
    axiosInstanceGeneral
      .post(
        "api/foods/",
        {
          name: e.target.name.value,
          price: e.target.price.value,
          category:e.target.category.value,
          image: selectedImg,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setItems(prev=> [...prev, res.data]);

        setShowSnackBar({
          show: true,
          msg: "item added successfully",
          type: "success",
        });
        setShowModal(false)
      })
      .catch((err) => {
        console.log(err);
        setShowSnackBar({
          show: true,
          msg: "error occurred",
          type: "error",
        });
      })
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    setSelectedImg(selected);
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        required
        size="small"
        name="name"
        fullWidth
        label="Food Name"
      />
      <FormControl sx={{ mt: 1 }} size="small">
        <InputLabel id="demo-select-small">choose a category</InputLabel>
        <Select
          required
          fullWidth
          name='category'
          labelId="demo-select-small"
          id="demo-select-small"
          value={category?.id ? category?.id : ""}
          label="choose category"
          onChange={handleCategoryChange}
          MenuProps={MenuProps}
        >
          {categories?.map((item) => (
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
      <TextField required size="small" name="price" fullWidth label="Price" />
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          component="img"
          src={imgPreview}
          sx={{
            display: imgPreview ? "block" : "none",
            height: 100,
            objectFit: "fit",
          }}
        />
        <Button component="label" variant="outlined">
          Choose Image
          <input type="file" name="image" onChange={handleImageChange} hidden />
        </Button>
      </Box>
      <Button type="submit" variant="contained" color="success" size="small">
        Save
      </Button>
    </Box>
  );
};

function AddFoods() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  return (
    <Box>
      <AddItemCommon
        {...{ items, setItems, showModal, setShowModal }}
        title="food"
        titlePlural="foods"
        itemModal={<AddFoodModal {...{ setShowModal, setItems }} />}
      />
    </Box>
  );
}

export default AddFoods;
