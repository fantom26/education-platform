import { FC } from "react";

import { Button, CardActions, Rating } from "@mui/material";

export const CourseCardActions: FC<{ rating: number }> = ({ rating }) => (
  <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <Rating name="course-rating" defaultValue={rating} precision={0.5} readOnly />
    <Button variant="contained">See course</Button>
  </CardActions>
);
