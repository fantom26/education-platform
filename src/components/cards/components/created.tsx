import { FC } from "react";

import { Event } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

export const Created: FC<{ launchDate: string }> = ({ launchDate }) => {
  const createdAt = dayjs(launchDate).format("DD MMMM YYYY");

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Event />
      <Typography align="left" variant="body2">
        {createdAt}
      </Typography>
    </Box>
  );
};
