import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState } from 'react';

export default function DatePicker({label, start, setDates}) {
  const [value, setValue] = useState(null);

  const handleChange = (newValue) => {
    setValue(newValue);
    setDates(prev=>{
      if(start) return {...prev, start:newValue.$d.toLocaleDateString()}
      return {...prev, end:newValue.$d.toLocaleDateString()}
    })
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} >
    
        <MobileDatePicker
          label={label}
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />

      
      </Stack>
    </LocalizationProvider>
  );
}
