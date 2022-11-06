import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import React, { useState } from "react";

function Password({ label, onChange, helperText, onBlur, error, value, name, variant, size, sx }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      sx ={sx}  
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      name={name}
      size={size}
      error={error}
      helperText={helperText}
      variant={variant}
      type={showPassword ? "text" : "password"} // <-- This is where the magic happens
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <Visibility fontSize='small' />:<VisibilityOff fontSize='small'/>}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default Password;
