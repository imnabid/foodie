import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";
import { UserContext } from "../../GlobalContext";

function DeleteConfirm({ showConfirm, setShowConfirm, setCancelled, id }) {
  const { setShowSnackBar } = useContext(UserContext);
  const handleCancellation = (id) => {
    axiosInstanceGeneral
      .get(`api/cancel-order/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (res.status === 202) {
          setCancelled(true);
          setShowSnackBar({
            show: true,
            msg: "Order cancelled successfully",
            type: "success",
          });
        }
      })
      .catch((err) => {
        setShowSnackBar({
            show: true,
            msg: err.response.data,
            type: "error",
          });
      });
    handleClose();
  };
  const handleClose = () => {
    setShowConfirm(false);
  };
  return (
    <Dialog
      open={showConfirm}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you want to cancel this order
      </DialogTitle>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="error" onClick={() => handleCancellation(id)} autoFocus>
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirm;
