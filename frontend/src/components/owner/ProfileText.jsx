import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  SvgIcon,
} from "@mui/material";

function ProfileText({ label,placeholder,defaultVal,size, sx, icon, name, edit, type }) {
  const [disabled, setDisabled] = useState(true);

  return (
    <TextField
      placeholder={placeholder}
      required
      sx={sx}
      label={label}
      defaultValue={defaultVal}
      disabled={disabled}
      name={name}
      fullWidth
      size={size}
      variant="standard"
      type={type && "text"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Tooltip title={edit} arrow>
              <SvgIcon fontSize='small' component={icon} inheritViewBox />
            </Tooltip>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Edit" arrow>
              <IconButton onClick={() => setDisabled(false)}>
                <EditIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ProfileText;
