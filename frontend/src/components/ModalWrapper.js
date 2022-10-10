import {
  Box,
  Fade,
  Grow,
  IconButton,
  Modal,
  Slide,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";



function ModalWrapper({ show, setShow,setShowCombo, children }) {
  const handleClose = () => {
    setShow(false);
    setShowCombo(false);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={show}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade direction="up" in={show}>
        <Box
          sx={{
            borderRadius: "5px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: { xs: "100%", sm: "450px" },
            width: { xs: "100%", sm: "650px" },
            bgcolor: "background.paper",
            boxShadow: 14,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton size="large" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalWrapper;
