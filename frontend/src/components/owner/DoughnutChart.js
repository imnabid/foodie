import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
function DoughnutChart() {
  const data = {
    labels: [
      "Momo",
      "Pizza",
      "Chowmein",
      "Beverage",
      "dessert",
      "Khajaset",
      " Burger",
    ],

    datasets: [
      {
        data: [130, 90, 45, 50, 49, 144, 169],

        backgroundColor: [
          "rgb(255, 0, 0)",
          "rgb(255, 127, 0)",
          "rgb(255, 255, 0)",
          "rgb(0, 255, 0)",
          "rgb(0, 0, 255)",
          "rgb(46, 43, 95)",
          "rgb(139, 0, 255)",
        ],
        borderRadius: 1,
        borderSkipped: false,
        arcPercentage: 0.6,
        categoryPercentage: 1,
        hoverBorderWidth: 1,
        borderJoinStyle: "round",
        borderWidth: 0.5,
        radius: "80%",
        cutout: "65%",
      },
    ],
  };

  const hoverLabel = [
    {
      id: "hoverLabel",

      beforeDraw(chart) {
        const {
          ctx,
          chartArea: { width, height },
        } = chart;
        ctx.save();

        if (chart._active.length === 0) {
          ctx.font = "bolder 18px courier";
          ctx.fillStyle = grey[700];
          ctx.textAlign = "center";

          ctx.fillText("100k", width / 2, height / 2);
          ctx.font = "bolder 12px courier";
          ctx.fillText("Weekly Sales", width / 2, height / 2 + 15);
        }
      },

      afterDraw(chart) {
        const {
          ctx,
          chartArea: { width, height },
        } = chart;
        ctx.save();

        if (chart._active.length > 0) {
          const textLabel = chart.config.data.labels[chart._active[0].index];

          const numberLabel =
            chart.config.data.datasets[chart._active[0].datasetIndex].data[
              chart._active[0].index
            ];

          const color =
            chart.config.data.datasets[chart._active[0].datasetIndex]
              .backgroundColor[chart._active[0].index];

          ctx.font = "bolder 18px courier";
          ctx.fillStyle = color;
          ctx.textAlign = "center";

          ctx.fillText(numberLabel, width / 2, height / 2);
          ctx.font = "bolder 12px courier";
          ctx.fillText(textLabel, width / 2, height / 2 + 15);
        }
      },
    },
  ];

  const config = {
    data,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };

  return (
    <>
        <CardHeader
          title="Sales Overview"
          subheader="MoMo is our total selling item today 😃!!"
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ width: 250 }}>
            <Doughnut data={data} options={config} plugins={hoverLabel} />
          </Box>
        </Box>
    </>
  );
}

export default DoughnutChart;
