import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstanceGeneral } from "../../axios/axios";
import { UserContext } from "../../GlobalContext";

function ConfirmOrder({ showConfirm, setShowConfirm }) {
  const { user, cartItems, setCartItems, setShowSnackBar, deliveryCharge } =
    useContext(UserContext);
  const navigate = useNavigate();
  const handleConfirmation = () => {
    //store the orderItem in the database
    let orderItems = { items: [], total: 0 };
    const cart = cartItems.items;

    const postOrderItems = async () => {
      for (let i = 0; i < cart.length; i++) {
        try {
          const res = await axiosInstanceGeneral.post(
            "api/add-order-item/",
            {
              food: cart[i].id,
              quantity: cart[i].quantity,
              total: cart[i].quantity * cart[i].price,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          orderItems.items.push(res.data.id);
          orderItems.total += res.data.total;
        } catch (err) {
          console.log("custom err", err.response);
        }
      }
    };

    const postOrder = async () => {
      const res = await postOrderItems();
      //posting comboItems in Combo table
      axiosInstanceGeneral
        .post(
          "api/orders/",
          {
            note: cartItems.note,
            food: orderItems.items,
            total: orderItems.total + deliveryCharge,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          setShowSnackBar({
            show: true,
            msg: res.data.status,
            type: "success",
          });
          setCartItems({ note: "", items: [], num: 0 });
          navigate('/');
        })
        .catch((err) => console.log(err.response.data));
    };

    postOrder();
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
        Do you confirm this order
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          By confirming you agree that you clicked it on purpose
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="error" onClick={handleConfirmation} autoFocus>
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmOrder;
