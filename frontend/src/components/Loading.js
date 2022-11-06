import { Backdrop, CircularProgress } from "@mui/material";

function Loading({isLoading}) {
  return (
    <Backdrop
      sx={{ background:'#fd2020', color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
