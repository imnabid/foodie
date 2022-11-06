import { Box, Button, Chip, Grid, IconButton, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function OrderListCard() {
  return (
    <Box
      sx={{
        width: {md:"70%"},
        boxShadow: 5,
        borderRadius: "10px",
        px:3,
        py:1.5
      }}
    >
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <Typography color='primary'>Order Id:#12</Typography>
            <Button variant='outlined' size='small' color='warning' endIcon={<NavigateNextIcon />}> Send Forward</Button>
        </Box>
      <Grid container spacing={2}>
        <Grid
          item          
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography color="error">@nabin123</Typography>

            <Typography variant='body2' color="text.secondary">2022-11-10 at 4:00pm</Typography>
          </Box>
          <Typography variant="h6" color="error">
            Order Items:
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Chip
              label="Chicken Tikka Pizza x 3"
              size="small"
              color="warning"
            />
            <Chip label="Rs 300" size="small" />
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Chip label="Veg Momo x 1" size="small" color="warning" />
            <Chip label="Rs 90" size="small" />
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Chip label="Fanta x 3" size="small" color="warning" />
            <Chip label="Rs 100" size="small" />
          </Box>
          <Typography variant='h6' color='error'>Total: Rs490</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Box sx={{ display: "flex",alignItems:'center', gap: 1 }}>
            <Typography color="error">Note:</Typography>
            <Typography variant='body2' color="text.secondary">
              Please add extra cheese to my Pizza
            </Typography>
          </Box>
          <Typography variant="h6" color="error">
            Delivery Information
          </Typography>
          <Typography color="text.secondary">Banepa-09, Kavre</Typography>
          <Typography color="text.secondary">9840178664</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderListCard;
