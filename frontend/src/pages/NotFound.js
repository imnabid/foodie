import { Box, Typography } from '@mui/material'
import notFound from '../images/NoData.png'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    }}>
        <Box component='img'
        src={notFound}
        alt='Not Found'
        sx={{
            width:300
        }}
        />
        <Typography variant='h4' color='error'>
            404 Not Found
        </Typography>
        <Box>
            <Link to='/'>Go To Homepage</Link>
        </Box>
    </Box>
  )
}

export default NotFound