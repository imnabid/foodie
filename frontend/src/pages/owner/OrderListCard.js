import { Box, Button, Chip, Grid, IconButton, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { axiosInstanceGeneral } from "../../axios/axios";

function OrderListCard({ item, status }) {
  
  const getNextStatus = ()=>{
    if(status==='OT') return 'P';
    if(status==='P') return 'S';
    if(status==='S') return 'D';
  }

  const getNextStatusButton = ()=>{
    if(status==='OT') return 'Prepare';
    if(status==='P') return 'Shipped';
    if(status==='S') return 'Delivered';
  }

  const handleClick = ()=>{
    axiosInstanceGeneral.patch(`api/order-status/${item.id}/`,{
      status:getNextStatus()
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    }).catch(err=>console.log(err))
  }

  return (
    <Box
      sx={{
        width: { md: "70%" },
        boxShadow: 4,
        borderRadius: "10px",
        px: 3,
        py: 1.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography color="primary">Order Id:#{item.id}</Typography>
        <Button
          variant="outlined"
          size="small"
          color="warning"
          endIcon={<NavigateNextIcon />}
          onClick={handleClick}
        >
          {getNextStatusButton()}
        </Button>
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
            <Typography color="error">@{item.user}</Typography>

            <Typography variant="body2" color="text.secondary">
              {item.date}
            </Typography>
          </Box>
          <Typography variant="h6" color="error">
            Order Items:
          </Typography>
          {item?.food.map((food) => (
            <Box key={food.id} sx={{ display: "flex", gap: 4 }}>
              <Chip
                label={`${food.name} x ${food.quantity}`}
                size="small"
                color="warning"
              />
              <Chip label={`Rs ${food.price*food.quantity}`} size="small" />
            </Box>
          ))}

          <Typography color="error">
            Delivery Charge: Rs{item.fee}
          </Typography>
          <Typography variant="h6" color="error">
            Total: Rs{item.total}
          </Typography>
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography color="error">Note:</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.note || 'No notes'}
            </Typography>
          </Box>
          <Typography variant="h6" color="error">
            Delivery Information
          </Typography>
          <Typography color="text.secondary">{item.address.city},{item.address.street}</Typography>
          <Typography color="text.secondary">{item.address.landmark}</Typography>
          <Typography color="text.secondary">{item.address.mobile}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderListCard;
