import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import React, { useState } from "react";

function Password({ label, variant, size, sx }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
    required
      sx ={sx}  
      label={label}
      fullWidth
      name='password'
      size={size}
      variant={variant}
      type={showPassword ? "text" : "password"} // <-- This is where the magic happens
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default Password;
