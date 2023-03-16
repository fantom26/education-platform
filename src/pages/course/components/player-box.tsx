import { FC, useState } from "react";

import { Stack } from "@mui/material";

import { ILesson } from "utils/types";

import { Lessons } from "./lessons";
import { Player } from "./player";

export const PlayerBox: FC<{ lessons: ILesson[] }> = ({ lessons }) => {
  const [currentLesson, setCurrentLesson] = useState<ILesson>(lessons[0]);

  const selectLesson = (lesson: ILesson) => {
    setCurrentLesson(lesson);
  };

  return (
    <Stack direction="row" gap={2}>
      <Player lesson={currentLesson} />
      <Lessons lessons={lessons} onSelectLesson={selectLesson} currentLesson={currentLesson} />
    </Stack>
  );
};
