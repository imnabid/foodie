import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import AddCategories from './AddCategories'
import AddFoods from "./AddFoods";
import AddOffers from "./AddOffers";

function AddItem() {
  const [alignment, setAlignment] = useState("categories");

  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
  };
  const getComponent = ()=>{
    if(alignment === 'categories') return <AddCategories/>
    if(alignment === 'foods') return <AddFoods/>
    return <AddOffers/>
  };
  return (
    <Box >
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{p:2, display:'flex',justifyContent:{xs:'center',md:'flex-start'}}}
      >
        <ToggleButton value="categories">CATEGORIES</ToggleButton>
        <ToggleButton value="foods">FOODS</ToggleButton>
        <ToggleButton value="offers">OFFERS</ToggleButton>
      </ToggleButtonGroup>
      <Box>
        {getComponent()}
      </Box>
    </Box>
  );
}

export default AddItem;
