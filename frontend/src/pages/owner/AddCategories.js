import { Avatar, Box, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import AddItemCommon from "./AddItemCommon";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { axiosInstanceGeneral } from "../../axios/axios";
import { useContext } from "react";
import { UserContext } from "../../GlobalContext";

const AddCategoryModal = ({ setItems, setShowModal }) => {
  const [imgPreview, setImgPreview] = useState();
  const [selectedImg, setSelectedImg] = useState();
  const { setShowSnackBar } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!selectedImg) {
        setShowSnackBar({
            show:true,
            msg:'img is required',
            type:'error'
        })
        return;
    }
    const name = e.target.name.value;
    const description = e.target.description.value;
    axiosInstanceGeneral
      .post(
        "api/categories/",
        {
          category_name: name,
          description: description,
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
      })
      .catch((err) => {
        console.log(err);
        setShowSnackBar({
          show: true,
          msg: "error occurred",
          type: "error",
        });
      })
      .finally(() => setShowModal(false));
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
      <TextField required size="small" name="name" fullWidth label="Category Name" />
      <TextField
        required
        multiline
        size="small"
        name="description"
        fullWidth
        label="Description"
      />
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
            width: 200,
            objectFit: "cover",
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

//wraps
function AddCategories() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  return (
    <Box>
      <AddItemCommon
        {...{ items, setItems, showModal, setShowModal }}
        title="category"
        titlePlural="categories"
        itemModal={<AddCategoryModal {...{ setShowModal, setItems }} />}
      />
    </Box>
  );
}

export default AddCategories;
