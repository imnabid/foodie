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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { axiosInstanceGeneral } from "../../axios/axios";
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
import { useEffect } from "react";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartInfo = ({ item, amount }) => {
  return (
    <Box sx={{ display: "wrap" }}>
      <Box sx={{ display: "flex", mt: 2, gap: 0.5 }}>
        <FiberManualRecordIcon sx={{ fontSize: "12px" }} />

        <Typography variant="body2" sx={{ mt: -0.55 }}>
          {" "}
          {item}{" "}
        </Typography>
      </Box>
      <Box sx={{ ml: 2 }}>
        <Typography variant="h6">Rs{amount}</Typography>
      </Box>
    </Box>
  );
};
const datasetsInitial = {
  borderRadius: 1,
  borderSkipped: false,
  arcPercentage: 0.6,
  categoryPercentage: 1,
  hoverBorderWidth: 1,
  borderJoinStyle: "round",
  borderWidth: 0.5,
  radius: "80%",
  cutout: "65%",
};

function DoughnutChart() {
  const [data, setData] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    axiosInstanceGeneral
      .get("api/categories/")
      .then((res) => {
        const labels = res.data.map((item) => item.category_name);
        const values = res.data.map((item) => item.id);
        const colors = res.data.map((i) => {
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          const rgb = `rgb(${r},${g},${b})`;
          return rgb;
        });
        setCategories(res.data);
        setData({
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: colors,
              ...datasetsInitial,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }, []);

  //   const data = {
  //     labels: [
  //       "Momo",
  //       "Pizza",
  //       "Chowmein",
  //       "Beverage",
  //       "dessert",
  //       "Khajaset",
  //       " Burger",
  //     ],

  // datasets: [
  //   {
  //     data: [130, 90, 45, 50, 49, 144, 169],

  //     backgroundColor: [
  //       "rgb(255, 0, 0)",
  //       "rgb(255, 127, 0)",
  //       "rgb(255, 255, 0)",
  //       "rgb(0, 255, 0)",
  //       "rgb(0, 0, 255)",
  //       "rgb(46, 43, 95)",
  //       "rgb(139, 0, 255)",
  //     ],
  //     borderRadius: 1,
  //     borderSkipped: false,
  //     arcPercentage: 0.6,
  //     categoryPercentage: 1,
  //     hoverBorderWidth: 1,
  //     borderJoinStyle: "round",
  //     borderWidth: 0.5,
  //     radius: "80%",
  //     cutout: "65%",
  //   },
  // ],
  //   };

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
          ctx.fillText("Overall Sales", width / 2, height / 2 + 15);
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
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };

  return (
    <Box>
      <Typography variant="h5">Sales Overview</Typography>
      {data ? (
        <Box sx={{ display: { xs: "block", md: "flex" }, gap: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: { xs: 300, md: 200 } }}>
              <Doughnut data={data} options={config} plugins={hoverLabel} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1.2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {categories?.map((item) => (
              <ChartInfo
                key={item.id}
                item={item.category_name}
                amount={item.id * 100}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <Typography>Null</Typography>
      )}
    </Box>
  );
}

export default DoughnutChart;
