import {Box, Step, StepLabel, Stepper, Typography } from "@mui/material";

const steps = ["Order Taken", "Preparing", "Shipped", "Delivered"];

function Status({step}) {
  return (
    <Box sx={{pb:2,borderBottom:'1px solid lightgrey', display: "flex", flexDirection: "column",justifyContent:'center', gap: 2 }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step
            sx={{
              "& .Mui-active": {
                color: "#fd2020 !important",
              },
              "& .Mui-completed": {
                color: "green !important",
              },
            }}
            key={label}
          >
            <StepLabel>
              <Typography sx={{ fontSize: "0.9rem" }}>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      
    </Box>
  );
}

export default Status;
