import {  Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../GlobalContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBar() {
  const {showSnackBar, setShowSnackBar} = useContext(UserContext);
  const {msg, type} = showSnackBar
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    setShowSnackBar({show:false,msg:'Login Successful',type:'success'})
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
  )
}

export default SnackBar;