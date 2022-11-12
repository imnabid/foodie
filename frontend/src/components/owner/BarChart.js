import { Box, Card, CardActions, CardHeader, Typography } from "@mui/material";
import React from "react";
import { blue } from "@mui/material/colors";
import { Paper } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({weeklyData}) => {
  return (
    <Card elevation={4} >
      <CardHeader title="Weekly Sales By Days" subheader={`Total: ${weeklyData.total_sales} Sales`} />
      <Box>
        <Bar
          data={{
            labels: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],

            datasets: [
              {
                data: weeklyData.weekly_sales,

                backgroundColor: blue[500],
                borderRadius: 5,
                borderSkipped: false,
                barPercentage: 0.6,
                categoryPercentage: 1,
                hoverBorderWidth: 1,
              },
            ],
          }}
          height={250}
          width={50}
          options={{
            maintainAspectRatio: false,

            responsive: true,

            scales: {
              xAxis: {
                weight: -1,
                grid: {
                  drawBorder: false,
                  display: false,
                },
              },
              yAxis: {
                grid: {
                  drawBorder: false,
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </Box>
      <CardActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 3
          }}
        >
          <Paper >
            <TrendingUpIcon color="primary" />
          </Paper>
          <Typography variant="body2">
            {weeklyData.total_orders} Total Orders
          </Typography>
          <Paper >
            <AttachMoneyIcon color="primary" />
          </Paper>
          <Typography variant="body2">
            Rs {weeklyData.total_earning} Total Earning
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default BarChart;
