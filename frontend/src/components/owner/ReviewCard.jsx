import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  Rating,
  Button,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { red } from "@mui/material/colors";

function ReviewCard({src, alt, value, title, content}) {
  return (
    <Card elevation={3}>
      <CardHeader
        sx={{ borderBottom: "1px solid lightgrey", m: 0, p: 0.5 }}
        avatar={<Avatar alt={alt} src={src} />}
        title={title}
        subheader={<Rating name="read-only" value={value} readOnly size="small"/>}
      />
      <CardContent sx={{ m: 0, p: 0.5 }}>
        <Typography variant="body3" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions >
        <Button size="small">Post</Button>
        <Button size="small" sx={{ color: red[500] }}>
          Ignore
        </Button>
      </CardActions>
    </Card>
  );
}

export default ReviewCard;
