import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import OrderListCard from './OrderListCard'

function OrderList() {
    const [alignment, setAlignment] = useState("placed");

  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
  };
//   const getComponent = ()=>{
//     if(alignment === 'categories') return <AddCategories/>
//     if(alignment === 'foods') return <AddFoods/>
//     return <AddOffers/>
//   };
  return (
    <Box sx={{m:2}}>
        <ToggleButtonGroup
        color="warning"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{mb:2, display:'flex',justifyContent:{xs:'center',md:'flex-start'}}}
      >
        <ToggleButton value="placed">PLACED(6)</ToggleButton>
        <ToggleButton value="preparing">PREPARING(2)</ToggleButton>
        <ToggleButton value="shipped">SHIPPED(4)</ToggleButton>
      </ToggleButtonGroup>
        <OrderListCard/>
    </Box>
  )
}

export default OrderList