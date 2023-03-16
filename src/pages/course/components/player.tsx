import { FC } from "react";

import { Box } from "@mui/material";

import { ILesson } from "utils/types";

export const Player: FC<{ lesson: ILesson }> = ({ lesson }) => (
  <Box sx={{ flex: 1 }}>
    <video controls poster={`${lesson?.previewImageLink}/lesson-${lesson?.order}.webp`} width="100%" height="100%">
      <source src={lesson?.link} type="application/x-mpegURL" />
    </video>
  </Box>
);
