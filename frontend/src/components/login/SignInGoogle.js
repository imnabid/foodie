import { Button, colors, createTheme, ThemeProvider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const customTheme = createTheme({
  palette: {
    primary: {
      main: colors.red[400],
    },
  },
});

function SignInGoogle({ sx }) {
  return (
    <ThemeProvider theme={customTheme}>
      <Button
        sx={sx}
        size="small"
        fullWidth
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
      >
        Sign in with Google
      </Button>
    </ThemeProvider>
  );
}

export default SignInGoogle;
