import { FC } from "react";

import { Chip, Stack } from "@mui/material";

export const Skills: FC<{ skills: string[] }> = ({ skills }) => (
  <Stack direction="row" gap={1} flexWrap="wrap">
    {skills.map((skill, index) => (
      <Chip key={index} label={skill} sx={{ fontSize: "10px" }} />
    ))}
  </Stack>
);
