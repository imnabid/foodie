import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import orderConfirm from '../images/orderConfirm.png'

function OrderComplete() {
  return (
    <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }}>
        <Box
        component='img'
        src={orderConfirm}
        alt = 'Order Confirmed'
        sx={{
            height:200,
            width:300,
            objectFit:'cover'
        }}
        />
        <Typography variant='h6' color='error'>
            Thank You for ordering at Foodie.
        </Typography>
        <Typography variant='h6' color='error'>
            Your order is successfully taken.
        </Typography>
        <Box sx={{display:'flex', gap:2}}>
            <Link to='/'>Go to Homepage</Link>
            <Link to='/orders'>Track Your Order</Link>
        </Box>
    </Box>
  )
}

export default OrderComplete