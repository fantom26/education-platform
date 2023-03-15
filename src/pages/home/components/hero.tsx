import { Box, Typography } from "@mui/material";

import { Container } from "components/ui";

export const Hero = () => (
  <Box sx={{ paddingBlock: 3 }}>
    <Container>
      <Typography align="center" variant="h2" component="h1">
        Hello and welcome to my case
      </Typography>
    </Container>
  </Box>
);
