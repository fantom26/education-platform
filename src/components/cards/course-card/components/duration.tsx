import { FC } from "react";

import { AccessTime } from "@mui/icons-material";
import { Box } from "@mui/material";

import { formatDuration } from "utils/helper";

export const Duration: FC<{ duration: number }> = ({ duration }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    <AccessTime />
    {formatDuration(duration)}
  </Box>
);
