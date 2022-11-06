import { Box, Typography, Paper, Button } from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DatePicker from "../../components/owner/DatePicker";
import HistoryGrid from "../../components/owner/HistoryGrid";

const exteriorhandler = [
  { name: "PDF", icon: <PictureAsPdfOutlinedIcon /> },
  { name: "CSV", icon: <InsertDriveFileOutlinedIcon /> },
  { name: "PRINT", icon: <PrintOutlinedIcon /> },
];

const OrderHistory = () => {
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

      <Box component='form' sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
        <DatePicker label="Order History from " />
        <DatePicker label="Order History to " />
        <Button variant='contained' type='submit'>Search</Button>
      </Box>
      <Box sx={{ width: { md: "70%" } }}>
        <HistoryGrid />
      </Box>
    </Box>
  );
};

export default OrderHistory;

//FB9A34
