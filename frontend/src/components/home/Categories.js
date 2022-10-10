import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import Slider from "react-slick";
import Category from "./Category";
import AddIcon from "@mui/icons-material/Add";
import CreateCombo from "../CreateCombo";
import ModalWrapper from "../ModalWrapper";
import ComboModal from "./ComboModal";
import ModalLg from "./ModalLg";

const CategoryDetail = {
  menuItems: [
    { id: 1, name: "Chicken Cmomo", price: 150 },
    { id: 2, name: "Chicken Pizza", price: 250 },
    { id: 3, name: "Roast", price: 50 },
    { id: 4, name: "Plain momo", price: 250 },
  ],
  categoryName: "Chicken Item",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting",
};

const cats = [
  { name: "Momo" },
  { name: "Chicken Tikka" },
  { name: "Pizza" },
  { name: "Pizza2" },
  { name: "Chicken2 Tikka" },
];
const settings = {
  dots: true,
  slidesToShow: 1,
  swipeToSlide: true,
  speed: 150,
  cssEase: "linear",
};

function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState(CategoryDetail);
  const [showCreateCombo, setShowCreateCombo] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Box
        sx={{
          display: { sm: "flex", xs: "none" },
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {cats.map((item) => (
          <Category key={item.name} {...item} handleClick={handleClick} />
        ))}
        <CreateCombo
          setShowModal={setShowModal}
          setShowCreateCombo={setShowCreateCombo}
        />
      </Box>

      <Box
        sx={{
          display: { sm: "none", xs: "block" },
          // borderBottom: "2px solid #fd2020",
        }}
        component={Slider}
        {...settings}
      >
        {cats.map((item) => (
          // <> is added because Box was displaying inline-block
          <React.Fragment key={item.name}>
            <Box
              onClick={handleClick}
              sx={{
                py: 0.5,
                px: 0.5,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Category {...item} />
            </Box>
          </React.Fragment>
        ))}
      </Box>
      <Box sx={{display:'flex', justifyContent:'center',mt:1}}>
      <Button
        onClick={() => {
          setShowModal(true);
          setShowCreateCombo(true);
        }}
        sx={{ display:{xs: "block", sm: "none"}, mt: 3 }}
        variant="outlined"
        size="small"
        color="warning"
      >
        <AddIcon />
        Make Custom Combo
      </Button>
      </Box>
      <ModalWrapper
        show={showModal}
        setShow={setShowModal}
        setShowCombo={setShowCreateCombo}
      >
        {showCreateCombo ? <ComboModal {...{setShowCreateCombo,setShowModal}}/> : ""}
        {showModal && !showCreateCombo ? <ModalLg data={modalDetails} /> : ""}
      </ModalWrapper>
    </>
  );
}

export default Categories;
