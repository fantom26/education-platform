import { FC, useRef } from "react";

import { Box } from "@mui/material";

import { VideoPlayer } from "components/common";
import { useHLSPlayer } from "hooks";
import { ILesson } from "utils/types";

export const Player: FC<{ lesson: ILesson }> = ({ lesson }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <VideoPlayer link={lesson.link as string} poster={`${lesson?.previewImageLink}/lesson-${lesson?.order}.webp`} />
      {/* <video
        ref={playerRef}
        preload="metadata"
        controls
        poster={`${lesson?.previewImageLink}/lesson-${lesson?.order}.webp`}
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
      ></video> */}
    </Box>
  );
};
