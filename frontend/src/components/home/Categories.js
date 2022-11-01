import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Category from "./Category";
import AddIcon from "@mui/icons-material/Add";
import CreateCombo from "./CreateCombo";
import ModalWrapper from "../ModalWrapper";
import ComboModal from "./ComboModal";
import ModalLg from "./ModalLg";
import { axiosInstanceGeneral } from "../../axios/axios";
import { useContext } from "react";
import { UserContext } from "../../GlobalContext";


const settings = {
  dots: true,
  slidesToShow: 1,
  swipeToSlide: true,
  speed: 150,
  cssEase: "linear",
};

function Categories() {
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  const [showCreateCombo, setShowCreateCombo] = useState(false);
  const { categories, setCategories } = useContext(UserContext);

  useEffect(() => {
    axiosInstanceGeneral
      .get("api/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("custom err", err));
  }, []);

  const handleClick = (category) => {
    axiosInstanceGeneral
      .get(`api/foods/${category.id}/`)
      .then((res) => {
        setModalDetails({ menuItems: res.data, ...category });
        setShowModal(true);
      })
      .catch((err) => console.log("custom err", err));
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
        {categories.map((item) => (
          <Category key={item.id} item={item} handleClick={handleClick} />
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
        {categories.map((item) => (
          // <> is added because Box was displaying inline-block
          <React.Fragment key={item.id}>
            <Box
              sx={{
                py: 0.5,
                px: 0.5,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Category item={item} handleClick={handleClick} />
            </Box>
          </React.Fragment>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        <Button
          onClick={() => {
            setShowModal(true);
            setShowCreateCombo(true);
          }}
          sx={{ display: { xs: "block", sm: "none" }, mt: 3 }}
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
        {showCreateCombo ? (
          <ComboModal {...{ setShowCreateCombo, setShowModal }} />
        ) : (
          ""
        )}
        {showModal && !showCreateCombo ? (
          <ModalLg data={modalDetails} initialFood={{}} />
        ) : (
          ""
        )}
      </ModalWrapper>
    </>
  );
}

export default Categories;
