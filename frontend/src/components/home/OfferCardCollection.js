import { Box } from '@mui/material'
import React from 'react'
import OfferCard from './OfferCard'

function OfferCardCollection() {
  return (
    <Box sx={{
        display:'flex',
        gap:1.5,
        flexWrap:'wrap'

    }}>
        <OfferCard/>
        <OfferCard/>
    </Box>
  )
}

export default OfferCardCollection