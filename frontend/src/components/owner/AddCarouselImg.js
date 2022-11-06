import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";
import { useState } from "react";
import { ImageSearch, PhotoCamera } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../../GlobalContext";

const CarouselImg = ({ item, setImages }) => {
  const { setShowSnackBar } = useContext(UserContext);
  const deleteImage = (id) => {
    axiosInstanceGeneral
      .delete(`api/images/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setShowSnackBar({
          show: true,
          msg: res.data.status,
          type: "success",
        });
        setImages((prev) => {
          const temp = prev.filter((item) => item.id !== id);
          return [...temp]
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        component="img"
        src={item.image}
        alt={item.id}
        sx={{ height: 200 }}
      />
      <Box
        sx={{
          p: 0.5,
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Chip
          size="small"
          onClick={() => deleteImage(item.id)}
          label={<DeleteIcon sx={{ fontSize: "20px" }} />}
          sx={{
            mr: 1,
            borderRadius: "5px",
          }}
          color="error"
        />
      </Box>
    </Box>
  );
};

function AddCarouselImg() {
  const [images, setImages] = useState([]);
  const [fileText, setFileText] = useState("No file choosen");
  const [uploadImages, setUploadImages] = useState();
  const { setShowSnackBar } = useContext(UserContext);

  useEffect(() => {
    axiosInstanceGeneral
      .get("api/images/")
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => console.log("custom err", err));
  }, []);

  const handleChange = (e) => {
    const images = e.target.files;
    setFileText(`${images.length} images choosen`);
    setUploadImages(images);
  };

  const addImage = () => {
    for (let i = 0; i < uploadImages.length; i++) {
      axiosInstanceGeneral
        .post(
          "api/images/",
          {
            image: uploadImages[i],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setImages((prev) => [...prev, res.data]);
          setFileText("No file choosen");
          setShowSnackBar({
            show: true,
            msg: "Image upload successfully",
            type: "success",
          });
        })
        .catch((err) =>
          setShowSnackBar({
            show: true,
            msg: "some error occurred. try later!",
            type: "error",
          })
        );
    }
  };

  return (
    <Box
      sx={{
        mx: 2,
        height: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">UPLOAD IMAGES</Typography>
      <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center" }}>
        <Button
          size="small"
          variant="outlined"
          component="label"
          onChange={handleChange}
        >
          Choose
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <Typography color="text.secondary">{fileText}</Typography>
        <Button variant="contained" onClick={addImage}>
          Upload
        </Button>
      </Box>
      <Box sx={{ mt: 2, display: "flex", gap: 2, overflowX: "scroll" }}>
        {
        images.length?images.map((item) => {
          return (
            <CarouselImg key={item.id} item={item} setImages={setImages} />
          );
        }):<Typography color='text.secondary'>No images found</Typography>
    }
      </Box>
    </Box>
  );
}
{
}

export default AddCarouselImg;
