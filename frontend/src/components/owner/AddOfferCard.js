import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { UserContext } from "../../GlobalContext";
import { axiosInstanceGeneral } from "../../axios/axios";
import { useState } from "react";

function DeleteConfirm({ open, setOpen, id, setItems }) {
  const { setShowSnackBar } = useContext(UserContext);
  const handleDelete = (id) => {
    axiosInstanceGeneral
      .delete(`api/offers/${id}/`, {        
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setItems(prev=>prev.filter(i=>i.id!==id));
        setShowSnackBar({
          show: true,
          msg: res.data.status,
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to delete this offer?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(id)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function AddOfferCard({ item, setItems }) {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        width: { xs: 150, sm: 200 },
        height: 200,
        borderRadius: "12px",
        position: "relative",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap:4,
          p: 1,
          position: "absolute",
          width: '90%',
          zIndex: 50,
        }}
      >
        <Chip
          size="small"
          sx={{
            borderRadius: "5px",
          }}
          label={`${item.discount_percent}% off`}
          color="warning"
        />
        <Chip
          size="small"
          onClick={() => setOpen(true)}
          label={<DeleteIcon sx={{ fontSize: "20px" }} />}
          sx={{
            borderRadius: "5px",
          }}
          color="warning"
        />
      </Box>
        {open && <DeleteConfirm {...{ open, setOpen }} id={item.id} setItems={setItems}/>}

      <Box
        component="img"
        src={item.food.image}
        alt={item.food.name}
        sx={{
          width: "100%",
          height: "70%",
          objectFit: "cover",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", m: 0.5 }}>
        <Typography
          color="error"
          variant="h6"
          sx={{ fontSize: { xs: "14px", sm: "18px" } }}
        >
          {item.food.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              textDecoration: "line-through",
            }}
          >
            Rs{item.price_before}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: { xs: "12px", sm: "14px" } }}
          >
            Rs{item.food.price}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AddOfferCard;
