import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";



function MyCard({ name }) {
  return (
    <div>
      <Card elevation={2}>
        <CardHeader title={name} subheader="testing" />
        <CardContent>
          <Typography variant="body2" color="danger">
            Lorem Ipsum is simply dummy text of the printing an d typesetting
            industry. Lorem Ipsum has been to make
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyCard;
