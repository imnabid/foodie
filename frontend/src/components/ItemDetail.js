import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height:450,
  bgcolor: 'white',
  boxShadow: 24,
  
};
function ItemDetail({open, handleClose}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
      
    >
      <Box sx={style} >
        <Grid container spacing={1}>
            <Grid item xs={2} sm={4} md={6}>
            <h1 className='h'>{style.height}</h1>
            </Grid>
            {/* <Grid item xs={4}>
            <h1 className='h'>text</h1>
            </Grid> */}

        </Grid>
      </Box>
    </Modal>
  );
}

export default ItemDetail;
