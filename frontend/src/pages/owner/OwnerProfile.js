import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/system";
import { useState } from "react";
import ChangeProfile from "../../components/ChangeProfile";
import BusinessProfile from "../../components/owner/BusinessProfile";

export default function OwnerProfile() {
  const [alignment, setAlignment] = useState("business profile");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box sx={{ m:2 }}>
      <ToggleButtonGroup
        color="warning"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="business profile">Business Profile</ToggleButton>

        <ToggleButton value="change password">Change Password</ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{mt:2}}>
        {alignment === "business profile" ? (
          <BusinessProfile />
        ) : (
          <Box sx={{width:{md:550}}}>
            <ChangeProfile />
          </Box>
        )}
      </Box>
    </Box>
  );
}
