import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

function SearchBar({ showSearch, setShowSearch }) {
  const [popUp, setPopUp] = useState(false);
  const [pattern, setPattern] = useState("");

  const handleChange = (event) => {
    setPattern(event.target.value.toLowerCase());
    setPopUp(true);
  };

  const handleClose = () => {
    setShowSearch(false);
    setPopUp(false);
    setPattern("");
  };
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box width='100%' sx={{display:'flex', justifyContent:'flex-end'}}>
      <Box
        width="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          mr:2
        }}
      >
        <OutlinedInput
          value={pattern}
          onChange={handleChange}
          fullWidth
          color="error"
          sx={{
            display: { xs: showSearch ? "flex" : "none", md: "flex" },
            borderRadius: "15px",
            height: { xs: "2rem", md: "2.5rem" },
          }}
          size="small"
          placeholder="Search"
          startAdornment={<SearchIcon sx={{ color: "gray" }} />}
          endAdornment={
            <IconButton
              onClick={handleClose}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <CloseIcon />
            </IconButton>
          }
        />
        <Paper
          elevation={3}
          sx={{
            width: { md: "100%", xs: "60vw" },
            maxHeight: "40vh",
            zIndex: 1000,
            p: 1,
            position: "absolute",
            display: popUp ? "flex" : "none",
            flexDirection: "column",
            top: "3rem",
            overflow: "hidden",
          }}
        >
          {ListItem(top100Films, pattern)}
        </Paper>
      </Box>
      <IconButton
        onClick={()=>setShowSearch(true)}
        sx={{ display: { xs: showSearch ? "none" : "flex",alignItems:'center', md: "none" } }}
        >
        <SearchIcon />
      </IconButton>
      </Box>
        </ClickAwayListener>
  );
}

const ListItem = (data, pattern) => {
  let arr = [];
  for (let film of data) {
    if (film.title.toLowerCase().includes(pattern)) {
      arr.push(<MenuItem key={film.title}>{film.title}</MenuItem>);
    }
  }
  return arr.length ? (
    arr.slice(0, 5)
  ) : (
    <Typography sx={{ color: "lightGrey" }}>No data found</Typography>
  );
};

export default SearchBar;
