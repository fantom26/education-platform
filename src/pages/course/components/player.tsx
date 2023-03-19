import { FC } from "react";

import { VideoPlayer } from "components/common";
import { ILesson } from "utils/types";

export const Player: FC<{ lesson: ILesson }> = ({ lesson }) => (
  <VideoPlayer link={lesson.link as string} poster={`${lesson?.previewImageLink}/lesson-${lesson?.order}.webp`} styles={{ flex: "1", height: "415px" }} />
);
