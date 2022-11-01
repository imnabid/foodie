import { Box, Card, CardActionArea, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../GlobalContext";

function CreateCombo({ setShowCreateCombo, setShowModal }) {
  const { user, setShowSnackBar } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      setShowModal(true);
      setShowCreateCombo(true);
    } else {
      setShowSnackBar({
        show:true,
        msg:'Login to create combo',
        type:'error'
      })
      navigate("login");
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 300,
        height: 150,
        borderRadius: "12px",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{ height: "100%", display: "flex", justifyContent: "center" }}
      >
        <Typography variant="h5" sx={{ color: "lightgrey" }}>
          <AddIcon />
          Create new Combo
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default CreateCombo;
