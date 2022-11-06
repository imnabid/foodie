import { useDemoData } from "@mui/x-data-grid-generator";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
  {
    field: "user",
    headerName: "User",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    type: "number",
    width: 150,
  },
  {
    field: "food",
    headerName: "Food",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    width: 100,
  },
  {
    field: "total",
    headerName: "Total ",
    width: 160,
  },
];

const rows = [
  {
    id: 1,
    category: "MoMo",
    food: "C-MoMo",
    quantity: 35,
    total: "$100",
  },
  {
    id: 2,
    category: "MoMo",
    food: "K-MoMo",
    quantity: 35,
    total: "$120",
  },
  { id: 3, category: "MoMo", food: "S-MoMo", quantity: 35, total: "$90" },
  {
    id: 4,
    category: "MoMo",
    food: "F-MoMo",
    quantity: 35,
    total: "$500",
  },
  {
    id: 5,
    category: "MoMo",
    food: "J-MoMo",
    quantity: 35,
    total: "$700",
  },
  {
    id: 6,
    category: "Pizza",
    food: "Tanduri Pizza",
    quantity: 35,
    total: "$2100",
  },
  {
    id: 7,
    category: "Pizza",
    food: "Mix Pizza",
    quantity: 35,
    total: "$1000",
  },
  {
    id: 8,
    category: "Dessert",
    food: "Chocolate Oreo Faufe",
    quantity: 35,
    total: "$200",
  },
  {
    id: 9,
    category: "Dessert",
    food: "Cheese Cake",
    quantity: 35,
    total: "$300",
  },
  {
    id: 10,
    category: "Bevarage",
    food: "Pepsi",
    quantity: 35,
    total: "$200",
  },
];

export default function ExportDefaultToolbar() {
  const [pageSize, setPageSize] = useState(3);
  const [currentPageNum, setCurrentPageNum] = useState(0);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const handlePageChange = (newPageNo) => {
    if(newPageNo>currentPageNum) {
      setOffset(prev=>prev+limit)
    }
    else{
      setOffset(prev=>prev-limit)
    }
    setCurrentPageNum(newPageNo);
  };
  useEffect(() => {
    setLoading(true);
    axiosInstanceGeneral
      .get("api/history/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        params: {
          limit: limit,
          offset: offset,
        },
      })
      .then((res) => {
        setCount(res.data.count);
        setData(res.data.results)
        setLoading(false);
        
      })
      .catch((err) => console.log("history err", err));
  }, [limit,offset]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {(
        <DataGrid
          componentsProps={{
            toolbar: {
              csvOptions: {
                fileName: "Owner",
                delimiter: ";",
                utf8WithBom: true,
              },
            },
          }}
          loading={loading}
          rows={data}
          columns={columns}
          pageSize={limit}
          rowCount={count}
          page={currentPageNum}
          pagination
          paginationMode="server"
          onPageChange = {handlePageChange}
          onPageSizeChange={(val)=>setLimit(val)}
          rowsPerPageOptions={[5, 10, 15,25]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      )}
    </Box>
  );
}
