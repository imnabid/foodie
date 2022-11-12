import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstanceGeneral } from "../axios/axios";
import OrderCard from "../components/orders/OrderCard";
import noData from '../images/NoData.png'

function Orders() {
  const [ orderedItems, setOrderedItems ] = useState();
  const [ userReview, setUserReview ] = useState({rate:0, message:'Your Review'});
  useEffect(()=>{
    axiosInstanceGeneral.get('api/user-review/',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }
    })
    .then(res=>setUserReview(res.data))
    .catch(err=>console.log('custom err', err.response))
  },[])
  useEffect(()=>{
    axiosInstanceGeneral.get('api/orders/',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }
    })
    .then(res=>setOrderedItems(res.data))
    .catch(err=>console.log('custom err', err.response))
  },[])


  return <Box sx={{mt:4,display:'flex', flexDirection:'column',alignItems:'center', gap:4}}>
    <Typography variant='h5' color='error'>Your Orders</Typography>
    {
      orderedItems?orderedItems.map(item=>(
        <OrderCard key={item.id} {...{item, userReview, setUserReview}} />
      ))
      :
      <Box sx={{display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
        <Box component='img' src={noData} sx={{width:200}}/>
      <Typography variant='h6' >No order history found!</Typography>
      <Typography color='primary' component={Link} to='/'>Click to Go To Homepage</Typography>

      </Box>
      
    }
  </Box>;
}

export default Orders;
