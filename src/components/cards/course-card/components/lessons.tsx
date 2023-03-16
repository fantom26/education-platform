import { FC } from "react";

import { PlayCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const Lessons: FC<{ lessonsCount: number }> = ({ lessonsCount }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    <PlayCircle />
    <Typography align="left" variant="body2">
      {lessonsCount}
    </Typography>
  </Box>
);
