import { Box } from '@mui/material'
import React from 'react'
import ChangeProfile from '../components/ChangeProfile'

function CustomerProfile() {
  return (
    <Box sx={{display:'flex', justifyContent:'center',alignItems:'center'}}> 
    <Box  sx={{width:{sm:600}}}>
        <ChangeProfile/>
    </Box>
    </Box>
  )
}

export default CustomerProfile