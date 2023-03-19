import { FC } from "react";

import { List, ListItem, ListItemButton, Stack, Typography } from "@mui/material";

import { formatDuration } from "utils/helper";
import { ILesson } from "utils/types";

interface LessonsProps {
  lessons: ILesson[];
  currentLesson: ILesson;
  onSelectLesson: (lesson: ILesson) => void;
}

export const Lessons: FC<LessonsProps> = ({ lessons, currentLesson, onSelectLesson }) => (
  <List sx={{ height: { xs: "250px", md: "415px" }, overflowY: "auto" }}>
    {lessons?.map((lesson, index) => (
      <ListItem key={lesson.id} disablePadding>
        <ListItemButton onClick={() => onSelectLesson(lesson)} disabled={lesson?.status === "locked"} divider selected={lesson?.id === currentLesson.id}>
          <Stack gap={0.5} flex={1}>
            <Stack direction="row" gap={1} justifyContent="space-between">
              <Typography variant="caption">{`Lesson ${index + 1}`}</Typography>
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {formatDuration(lesson?.duration)}
              </Typography>
            </Stack>
            <Typography variant="body2">{lesson?.title}</Typography>
          </Stack>
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);
