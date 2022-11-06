import { Box, Card, CardActions, CardHeader, Typography } from "@mui/material";
import React from "react";
import { blue, yellow } from "@mui/material/colors";
import { Paper } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import moment from "moment";
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

const Chart = () => {
  return (
    <Card elevation={4} >
      <CardHeader title="Weekly Sales" subheader="Total 50k Sales" />
      <Box>
        <Bar
          data={{
            labels: "SMTWTFS",

            datasets: [
              {
                data: [130, 90, 45, 50, 49, 144, 169],

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
            interaction: {
              mode: "point",
            },
            type: "time",
            time: {
              // string/callback - By default, date objects are expected. You may use a pattern string from http://momentjs.com/docs/#/parsing/string-format/ to parse a time string format, or use a callback function that is passed the label, and must return a moment() instance.
              parser: false,
              // string - By default, unit will automatically be detected.  Override with 'week', 'month', 'year', etc. (see supported time measurements)
              unit: "day",
              backgroundColor: yellow[500],
              // Number - The number of steps of the above unit between ticks
              unitStepSize: 1,

              // string - By default, no rounding is applied.  To round, set to a supported time unit eg. 'week', 'month', 'year', etc.
              round: false,

              // Moment js for each of the units. Replaces `displayFormat`
              // To override, use a pattern string from http://momentjs.com/docs/#/displaying/format/
              displayFormats: {
                max: moment().startOf("year"),
                min: moment().endOf("year"),
                millisecond: "SSS [ms]",
                second: "h:mm:ss a", // 11:20:01 AM
                minute: "h:mm:ss a", // 11:20:01 AM
                hour: "MMM D, hA", // Sept 4, 5PM
                day: "MMM Do", // Sep 4 2015
                week: "ll", // Week 46, or maybe "[W]WW - YYYY" ?
                month: "MMM YYYY", // Sept 2015
                quarter: "[Q]Q - YYYY", // Q3
                year: "YYYY", // 2015
              },
            },
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
                position: "top",
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
            50k <br /> Sales
          </Typography>
          <Paper >
            <AttachMoneyIcon color="primary" />
          </Paper>
          <Typography variant="body2">
            Rs.50k <br /> Total Profit
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Chart;
