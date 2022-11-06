import {
  Box,
  CardActionArea,
  Chip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import image from "../../images/combo.jpg";
import { Close } from "@mui/icons-material";
import { UserContext } from "../../GlobalContext";
import { axiosInstanceGeneral } from "../../axios/axios";

function ComboCard({ combo }) {
  const [total, setTotal] = useState(0);
  const [clicked, setClicked] = useState(false);
  const { cartItems, setCartItems, setCombos, setShowSnackBar } = useContext(UserContext);

  const addToCart = () => {
    let items = cartItems.items;
    let currentItems = combo.items;
    let indicesToPop = [];
    currentItems.forEach((item, index) => {
      items.forEach((i) => {
        if (item.name === i.name) {
          i.quantity += item.quantity;
          indicesToPop.push(index);
        }
      });
    });
    currentItems = currentItems.filter(
      (element, i) => !indicesToPop.includes(i)
    );
    items = items.concat(currentItems);
    setCartItems((prev) => {
      return { ...prev, items: items, num: items.length };
    });
    setShowSnackBar({
      show: true,
      msg: "items added to cart",
      type: "success",
    });
  };

  useEffect(() => {
    let sum = 0;
    combo.items.forEach((item) => {
      sum += parseInt(item.price) * item.quantity;
    });
    setTotal(sum);
  }, [combo.items]);

  const deleteCombo = (id) => {

    axiosInstanceGeneral.delete(`api/delete-combo/${id}/`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    }).
    then(res=>{
      if(res.status === 200){
        setShowSnackBar({
          show:true,
          msg:res.data.status,
          type:'success'
        })
        setCombos((prevCombos) => prevCombos.filter((c) => c.id !== combo.id));
      }
    })
    .catch(err=>console.log('custom err',err))


  };

  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <Box
      sx={{
        width: { xs: 150, sm: 200 },
        
        borderRadius: "12px",
        position: "relative",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,

          p: 1,
          position: "absolute",
          width: "90%",
          zIndex: 50,
        }}
      >
        <Chip
          size="small"
          onClick={addToCart}
          label={<AddShoppingCartIcon sx={{ fontSize: "20px" }} />}
          sx={{
            borderRadius: "5px",
          }}
          color="warning"
        />
        <Chip
          size="small"
          onClick={()=>deleteCombo(combo.id)}
          label={<Close sx={{ fontSize: "20px" }} />}
          sx={{
            borderRadius: "5px",
          }}
          color="warning"
        />
      </Box>
      <CardActionArea onClick={handleClick} sx={{borderRadius:'12px'}}>
        <Box sx={{display: !clicked ? "none" : "block",overflowY:'auto',height:200}}>
        <Box
          sx={{
            display:"flex",
            flexWrap:'wrap',
            gap:0.4,
            alignItems:'flex-start',
            pt:'40px',
            px:1,
            
          }}
        >
          {combo.items.map((item) => (
            <Chip
              color="error"
              key={item.name}
              size="small"
              label={`${item.name} x${item.quantity}`}
              variant="outlined"
              sx={{
              }}
            />
          ))}
        </Box>
        </Box>
        <Box sx={{ display: clicked ? "none" : "block", height: 200 }}>
          <Box
            component="img"
            src={image}
            alt="combo"
            sx={{
              width: "100%",
              height: "70%",
              objectFit: "cover",
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", m: 0.5 }}>
            <Typography sx={{ color: "#fd2020", fontSize: "1.1rem" }}>
              {combo.name}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "14px" }}>
              Total: Rs{total}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Box>
  );
}

export default ComboCard;
