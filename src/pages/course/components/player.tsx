import { FC } from "react";

import { Box } from "@mui/material";

import { VideoPlayer } from "components/common";
import { ILesson } from "utils/types";

export const Player: FC<{ lesson: ILesson }> = ({ lesson }) => (
  <Box sx={{ flex: 1 }}>
    <VideoPlayer link={lesson.link as string} poster={`${lesson?.previewImageLink}/lesson-${lesson?.order}.webp`} />
  </Box>
);
