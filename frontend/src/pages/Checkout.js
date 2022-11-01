import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModalWrapper from "../components/ModalWrapper";
import AddAddressModal from "../components/checkout/AddAddressModal";
import AddIcon from "@mui/icons-material/Add";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { UserContext } from "../GlobalContext";
import { useEffect } from "react";
import { axiosInstanceGeneral } from "../axios/axios";
import ConfirmOrder from "../components/checkout/ConfirmOrder";

const OrderSummaryTemplate = ({ title, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Typography variant="h6" color="text.secondary" sx={{ fontSize: "17px" }}>
      {title}
    </Typography>
    <Typography color="text.secondary">Rs {value}</Typography>
  </Box>
);

function Checkout() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);  
  const [address, setAddress] = useState();
  const [summary, setSummary] = useState([]);
  const { user, cartItems,deliveryCharge, setCartItems, setShowSnackBar } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axiosInstanceGeneral
        .get(`api/address/${user.id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => setAddress(res.data))
        .catch((err) => console.log(err.response));
    }
  }, [user]);

  useEffect(() => {
    const { cartTotal,deliveryFee, total } = calcOrderSummary();
    setSummary([
      { title: "Items Total", value: cartTotal },
      { title: "Delivery Fee", value: deliveryFee },
      { title: "Total Payment", value: total },
    ]);
  }, [cartItems]);

  const deleteCartItem = (id) => {
    let newItems = cartItems.items.filter((item) => item.id !== id);
    setCartItems((prev) => {
      return { ...prev, items: newItems, num: newItems.length };
    });
  };

  const calcOrderSummary = () => {
    let cartTotal = 0;
    let total = 0;
    let deliveryFee = deliveryCharge
    cartItems.items.forEach((item) => {
      cartTotal += item.price * item.quantity;
    });
    if (!cartTotal) return { cartTotal: 0, deliveryFee: 0, total: 0 };
    total = cartTotal + deliveryFee;
    return { cartTotal, deliveryFee, total };
  };

  const handlePlaceOrder = ()=>{
    if(!user || !cartItems.items.length) {
      setShowSnackBar({
        show:true,
        msg:'Add items to cart first',
        type:'error'
      });
      return;      
    }
    if(!address) {
      setShowSnackBar({
        show:true,
        msg:'You require address to place order!',
        type:'error'
      });
      return;      
    }

    setShowConfirm(true);
  }

  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      <Grid
        item
        xs={12}
        md={7}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box boxShadow={2}>
          {address ? (
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Typography variant="h6" color="error">
                  Current Delivery Address
                </Typography>
                <Typography
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setShowModal(true)}
                >
                  change address
                </Typography>
              </Box>
              <Typography color="text.secondary">
                {address.full_name}
              </Typography>
              <Typography color="text.secondary">{address.mobile}</Typography>
              <Typography color="text.secondary">{address.city}</Typography>
              <Typography color="text.secondary">{address.street}</Typography>
              <Typography color="text.secondary">{address.landmark}</Typography>
            </Box>
          ) : (
            <CardActionArea onClick={() => setShowModal(true)}>
              <Box
                sx={{
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  color="error"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <AddIcon />
                  Add new Address
                </Typography>
              </Box>
            </CardActionArea>
          )}
          <ModalWrapper
            show={showModal}
            setShow={setShowModal}
            setShowCombo={() => false} //dummy function
          >
            <AddAddressModal
              setShowModal={setShowModal}
              address={address}
              setAddress={setAddress}
            />
          </ModalWrapper>
        </Box>
        <Box
          sx={{
            p: 2,
            boxShadow: 4,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          {cartItems.items.length ? (
            cartItems.items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Avatar src={item.image} alt={item.name} />
                <Typography
                  sx={{
                    width: "50%",
                    textOverflow: "ellipsis",
                    color: "#333333",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    width: "10%",
                    color: "#333333",
                  }}
                >
                  Qty:{item.quantity}
                </Typography>
                <IconButton onClick={() => deleteCartItem(item.id)}>
                  <DeleteOutlineIcon sx={{ fontSize: "20px" }} />
                </IconButton>
                <Typography
                  sx={{
                    width: "20%",
                    fontSize: "15px",
                    textAlign: "center",
                  }}
                  color="text.secondary"
                >
                  price: Rs{item.price * item.quantity}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">No items in Cart!</Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={5}>
        <Box
          sx={{
            boxShadow: 4,
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            height: 350,
          }}
        >
          <Typography variant="h6" color="error">
            Order Summary
          </Typography>
          <Box>
            {summary.map((item) => (
              <OrderSummaryTemplate key={item.title} {...item} />
            ))}
          </Box>
          <Box>
            <Typography variant="h6" color="error">
              Payment Method
            </Typography>
            <Box>
              <Card
                sx={{
                  width: 150,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LocalAtmIcon
                  color="text.secondary"
                  sx={{ fontSize: "50px" }}
                />
                <Typography color="text.secondary">Cash On Delivery</Typography>
              </Card>
            </Box>
          </Box>
          <Button fullWidth variant="contained" color="error" onClick={handlePlaceOrder}>
            Place Order
          </Button>
          {
            showConfirm && <ConfirmOrder {...{showConfirm,setShowConfirm}}/>
          }
        </Box>
      </Grid>
    </Grid>
  );
}

export default Checkout;
