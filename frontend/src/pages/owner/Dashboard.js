import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
} from "@mui/material";
import BarChart from "../../components/owner/BarChart";
import DoughnutChart from "../../components/owner/DoughnutChart";
import { axiosInstanceGeneral } from "../../axios/axios";

const Dashboard = () => {

  const [weeklyData, setWeeklyData] = useState();

  useEffect(()=>{
    axiosInstanceGeneral.get('api/weekly-summary/',{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    .then(res=>{
      if(res.status===200) setWeeklyData(res.data);
    })
    .catch(err=>console.log('custom err',err))
  },[])

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
       { weeklyData && <DoughnutChart weeklyData={weeklyData} />}
        
      </Card>
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
      { weeklyData && <BarChart weeklyData={weeklyData} /> }
      </Box>
    </Box>
  );
  };

export default Dashboard;
