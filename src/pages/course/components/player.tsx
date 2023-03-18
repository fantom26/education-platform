import { FC, useRef } from "react";

import { Box } from "@mui/material";

import { useHLSPlayer } from "hooks";
import { ILesson } from "utils/types";

export const Player: FC<{ lesson: ILesson }> = ({ lesson }) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useHLSPlayer({ link: (lesson.link as string) || "", playerRef });

  return (
    <Box sx={{ flex: 1 }}>
      <video
        ref={playerRef}
        preload="metadata"
        controls
        poster={`${lesson?.previewImageLink}/lesson-${lesson?.order}.webp`}
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
      ></video>
    </Box>
  );
};
