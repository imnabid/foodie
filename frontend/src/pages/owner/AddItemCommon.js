import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import ItemCardCommon from "../../components/owner/ItemCardCommon";
import ModalWrapper from "../../components/ModalWrapper";
import { axiosInstanceGeneral } from "../../axios/axios";


function AddItemCommon(props) {
  const {title,titlePlural,itemModal, items, setItems, showModal, setShowModal} = props
  useEffect(() => {
    axiosInstanceGeneral
      .request({
        method: "get",
        url: `api/${titlePlural}/`,  //categories,foods,offers
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{px: 2 }}>
      <Box sx={{ display: "flex", gap: 2, justifyContent:{xs:'center',md:'flex-start'} }}>
        <Typography color="error" variant="h6">
          Edit {titlePlural}
        </Typography>
        <Button
          variant="outlined"
          color="success"
          onClick={() => setShowModal(true)}
        >
          Add New
        </Button>
        <ModalWrapper
          show={showModal}
          setShow={setShowModal}
          setShowCombo={() => false} //dummy function
        >
          {itemModal}
        </ModalWrapper>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-start" },
          gap: 1.5,
        }}
      >
        {items.length?items.map((item) => (
          <ItemCardCommon key={item.id} item={item} setItems={setItems} titlePlural={titlePlural}/>
        )):null}
      </Box>
    </Box>
  );
}

export default AddItemCommon;
