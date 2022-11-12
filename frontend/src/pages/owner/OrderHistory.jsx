import { Box, Typography, Paper, Button } from "@mui/material";
import DatePicker from "../../components/owner/DatePicker";
import { CSVLink} from "react-csv";
import {DataGrid} from "@mui/x-data-grid";
import DownloadIcon from '@mui/icons-material/Download';
import { useState, useEffect } from "react";
import { axiosInstanceGeneral } from "../../axios/axios";
import { useRef } from "react";

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

const initializeDate = () => {
  const date = new Date();
  const end = date.toLocaleDateString();
  date.setDate(date.getDate() - 5);
  const start = date.toLocaleDateString();
  return { start: start, end: end };
};


const OrderHistory = () => {
  const csvLink = useRef(null);
  const [dates, setDates] = useState(() => initializeDate());
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [csvData, setCsvData] = useState(null);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [fetchData, setFetchData] = useState(true);
  const [path, setPath] = useState("history");

  const handleSearch = () => {
    setOffset(0);
    setPath("history-date");
    setFetchData(true);
  };
 

//to handle csv download
  useEffect(()=>{
    if(csvData){
      csvLink.current.link.click();
      setCsvData(null);
    }

  },[csvData])
  const handleDownloadCSV = (event,done) => {
    axiosInstanceGeneral
        .request({
          method: path === "history-date" ? "post" : "get",
          url: `api/${path}/`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params: {
            limit: count,
            offset: 0,
          },
          data: {
            start: dates.start,
            end: dates.end,
          },
        })
        .then((res) => {
          setCsvData(res.data.results);
          
        })
        .catch((err) => console.log("history err", err))

  };

  const handlePageChange = (newPageNo) => {
    if (newPageNo > currentPageNum) {
      setOffset((prev) => prev + limit);
    } else {
      setOffset((prev) => prev - limit);
    }
    setCurrentPageNum(newPageNo);
    setFetchData(true);
  };
  useEffect(() => {
    if (fetchData) {
      setLoading(true);
      axiosInstanceGeneral
        .request({
          method: path === "history-date" ? "post" : "get",
          url: `api/${path}/`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params: {
            limit: limit,
            offset: offset,
          },
          data: {
            start: dates.start,
            end: dates.end,
          },
        })
        .then((res) => {
          setCount(res.data.count);
          setData(res.data.results);
          setLoading(false);
          setFetchData(false);
        })
        .catch((err) => console.log("history err", err));
    }
  }, [limit, offset, fetchData, path]);


  const getFileName = ()=>{
    const date = new Date();
    return date.toLocaleDateString();
  }
  return (
    <Box
      sx={{
        pt: 2,
        px: 2,
        pl: { md: 10 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">
        ORDER <span style={{ color: "#F7C12C" }}>HISTORY</span>
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <DatePicker
          start={true}
          setDates={setDates}
          label="Order History from "
        />
        <DatePicker
          start={false}
          setDates={setDates}
          label="Order History to "
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Box sx={{ width: { md: "90%" } }}>
        <Button size='small' onClick={handleDownloadCSV} endIcon={<DownloadIcon/>}>export csv</Button>
        {csvData && <CSVLink ref={csvLink} data={csvData} filename={getFileName()} />}
        <Box sx={{ height: 400, width: "100%" }}>
          {
            <DataGrid
              loading={loading}
              rows={data}
              columns={columns}
              pageSize={limit}
              rowCount={count}
              page={currentPageNum}
              pagination
              paginationMode="server"
              onPageChange={handlePageChange}
              onPageSizeChange={(val) => setLimit(val)}
              rowsPerPageOptions={[5, 10, 15, 25]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          }
        </Box>
      </Box>
    </Box>
  );
};

export default OrderHistory;

//FB9A34
