import { FC } from "react";

import { AccessTime } from "@mui/icons-material";
import { Box } from "@mui/material";

export const Duration: FC<{ duration: number }> = ({ duration }) => {
  const formattedDuration = () => {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <AccessTime />
      {formattedDuration()}
    </Box>
  );
};
