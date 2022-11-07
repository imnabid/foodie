import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CardHeader,
  CardActions,
  Card,
} from "@mui/material";
// import avatar from '../utlis/avatar_1.png';
import orderPlaced from "../utlis/oplaced.png";
import orderInDelivery from "../utlis/oondelivery.png";
import orderDelivered from "../utlis/odelivered.png";
import earning from "../utlis/earning.png";
import BChart from "../../components/owner/Chart";
import sales from "../utlis/sales.png";
import items from "../utlis/box.png";
import customers from "../utlis/rating.png";
import DoughnutChart from "../../components/owner/DoughnutChart";

const dailyOrderInfo = [
  { title: "Total order placed", img: orderPlaced, value: 0 },
  { title: "Total order in delivery", img: orderInDelivery, value: 1 },
  { title: "Total order delivered", img: orderDelivered, value: 2 },
  { title: "Total earning", img: earning, value: 3 },
];



const SalesOverview = ({salesNo,customersNo,ordersNo})=>{
  const overallInfo = [
    { title: "Sales", img: sales, value: salesNo },
    { title: "Customers", img: customers, value: customersNo },
    { title: "Total order delivered", img: items, value: ordersNo },
  ];
  return(
    <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {overallInfo.map((item) => (
            <Box key={item.title} sx={{ textAlign: "center" }}>
              <Box component='img' src={item.img} alt="ditem" width="40px" />
              <Typography variant="body2">{item.title}</Typography>
              <Typography variant="h6">{item.value}</Typography>
            </Box>
          ))}
        </Box>
  )
}

const Dashboard = () => {
  return (
    <Box
      sx={{
        m: 2,
        mt: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 1.5,
      }}
    >
      <Card elevation={4} sx={{ p: 1, width: { md: "50%" } }}>
        <DoughnutChart />
        <SalesOverview salesNo={200} customersNo={20} ordersNo={300}/>
        
      </Card>
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
        <BChart />
      </Box>
    </Box>
  );
  return (
    <Grid container border={1} columnSpacing={2} sx={{}}>
      <Grid item border={1} xs={12} md={5} sx={{ boxShadow: 2, px: 1, py: 2 }}>
        <Typography variant="h6">
          THE STATUS OF <span style={{ color: "#F7C12C" }}>THE DAY</span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            pt: 5,
          }}
        >
          {dailyOrderInfo.map((item) => (
            <Box key={item.title} sx={{ textAlign: "center" }}>
              <img src={item.img} alt="ditem" width="60px" />
              <Typography variant="body2">{item.title}</Typography>
              <Typography variant="h6">{item.value}</Typography>
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item border={1} xs={12} md={5}>
        {/* <BChart /> */}
        <Typography>Hello</Typography>
      </Grid>
      {/* <Box>
          <Card elevation={3} sx={{ height: 200, width: "45%", p: 2, mt: -23 }}>
            <CardHeader
              title="Statistics Card"
              subheader="Total 25% growth in October"
            />
  
            <CardActions>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ml: 5,
                  gap: 10,
                }}
              >
                {overallInfo.map((item) => (
                  <Box key={item.title} sx={{ textAlign: "center" }}>
                    <img src={item.img} alt="ditem" width="60px" />
                    <Typography variant="body2">{item.title}</Typography>
                    <Typography variant="h6">{item.value}</Typography>
                  </Box>
                ))}
              </Box>
            </CardActions>
          </Card>
        </Box> */}
    </Grid>
  );
};

export default Dashboard;
