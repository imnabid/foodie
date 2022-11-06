import {
  Paper,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { axiosInstanceGeneral } from "../../axios/axios";
import { useContext } from "react";
import { UserContext } from "../../GlobalContext";
import { useState } from "react";

//item card is below this component
function DeleteConfirm({open, setOpen, id, setItems, titlePlural}) {
  const { setShowSnackBar } = useContext(UserContext);
  const handleDelete = (id) => {
    axiosInstanceGeneral
      .delete(`api/${titlePlural}/${id}/`,{  //to delete category and food
        headers:{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then((res) => {
        setShowSnackBar({
          show: true,
          msg: res.data.status,
          type: "success",
        });
        setItems((prev) => {
          return prev.filter((i) => i.id !== id);
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
          Do you want to delete this item?
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


//common item card for removing food/category for owner site
function ItemCardCommon({ item, setItems, titlePlural }) {
  const [open, setOpen] = useState(false);
  
  
  return (
    <Paper
      elevation={10}
      sx={{
        position: "relative",
        minWidth: 150,
        maxWidth: 150,
        backgroundColor: "#fde4e4",
        borderRadius: "25px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
          position: "absolute",
          zIndex: 50,
        }}
      >
        <Chip
          size="small"
          onClick={()=>setOpen(true)}
          label={<DeleteIcon sx={{ fontSize: "20px" }} />}
          sx={{
            borderRadius: "5px",
          }}
          color="warning"
        />
        {
          open && <DeleteConfirm {...{open,setOpen,setItems,titlePlural}} id={item.id} />
        }
      </Box>

      <CardActionArea>
        <Box
          component="img"
          src={item.image}
          alt="food item"
          sx={{ objectFit: "cover", width: 150, height: 110 }}
        />
        <CardContent sx={{display:'flex',flexWrap:'wrap'}}>
          <Typography gutterBottom color="text.secondary" textAlign="center"
          
          >
            {item.category_name || item.name }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export default ItemCardCommon;
