import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  ClickAwayListener,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";
import { UserContext } from "../../GlobalContext";
import ModalWrapper from "../ModalWrapper";
import ModalLg from "../home/ModalLg";

function SearchBar({ showSearch, setShowSearch }) {
  const [popUp, setPopUp] = useState(false);
  const [pattern, setPattern] = useState("");
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalFood, setModalFood] = useState({});
  const [modalDetails, setModalDetails] = useState({});
  const { categories } = useContext(UserContext);

  useEffect(() => {
    axiosInstanceGeneral
      .get("api/foods/")
      .then((res) => setFoods(res.data))
      .catch((err) => console.log("custom err", err));
  }, []);

  useEffect(() => {
    if (showSearch) {
      document.getElementById("test").focus({ focusVisible: true });
    }
  }, [showSearch]);

  const handleClick = (food, categoryId) => {
    const category = categories.find((item) => item.id === categoryId);
    axiosInstanceGeneral
      .get(`api/category-foods/${categoryId}/`)
      .then((res) => {
        handleClose();
        setModalDetails({ menuItems: res.data, ...category });
        setModalFood(food);
        setShowModal(true);
      })
      .catch((err) => console.log("custom err", err));
  };

  const handleChange = (event) => {
    setPattern(event.target.value.toLowerCase());
    setPopUp(true);
  };

  const handleClose = () => {
    setShowSearch(false);
    setPopUp(false);
    setPattern("");
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box width="100%" sx={{ display: "flex", justifyContent: "flex-end" }}>
       
        <Box
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            mr: 2,
          }}
        >
          <OutlinedInput
            value={pattern}
            id="test"
            onChange={handleChange}
            fullWidth
            color="error"
            sx={{
              display: { xs: showSearch ? "flex" : "none", md: "flex" },
              borderRadius: "15px",
              height: { xs: "2rem", md: "2.5rem" },
            }}
            size="small"
            placeholder="Search"
            startAdornment={<SearchIcon sx={{ color: "gray" }} />}
            endAdornment={
              <IconButton
                onClick={handleClose}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <CloseIcon />
              </IconButton>
            }
          />
          <Paper
            elevation={3}
            sx={{
              width: { md: "100%", xs: "60vw" },
              maxHeight: "40vh",
              zIndex: 1000,
              p: 1,
              position: "absolute",
              display: popUp ? "flex" : "none",
              flexDirection: "column",
              top: "3rem",
              overflow: "hidden",
            }}
          >
            {ListItem(foods, pattern, handleClick)}
          </Paper>
        </Box>
        <IconButton
          onClick={() => {
            setShowSearch(true);
          }}
          sx={{
            display: {
              xs: showSearch ? "none" : "flex",
              alignItems: "center",
              md: "none",
            },
          }}
        >
          <SearchIcon />
        </IconButton>

        <ModalWrapper
          show={showModal}
          setShow={setShowModal}
          setShowCombo={() => false} //dummy function
        >
          <ModalLg data={modalDetails} initialFood={modalFood} />
        </ModalWrapper>
      </Box>
    </ClickAwayListener>
  );
}

const ListItem = (data, pattern, handleClick) => {
  let arr = [];
  for (let food of data) {
    if (food.name.toLowerCase().includes(pattern)) {
      arr.push(
        <MenuItem
          onClick={() => handleClick(food, food.category)}
          key={food.id}
        >
          {food.name}
        </MenuItem>
      );
    }
  }
  return arr.length ? (
    arr.slice(0, 5)
  ) : (
    <Typography sx={{ color: "lightGrey" }}>No data found</Typography>
  );
};

export default SearchBar;
