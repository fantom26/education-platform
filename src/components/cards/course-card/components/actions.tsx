import { FC } from "react";

import { Button, CardActions, Rating } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const CourseCardActions: FC<{ id: string; rating: number }> = ({ id, rating }) => (
  <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <Rating name="course-rating" defaultValue={rating} precision={0.5} readOnly />

    <Button component={RouterLink} variant="contained" to={`/course/${id}`}>
      See course
    </Button>
  </CardActions>
);
