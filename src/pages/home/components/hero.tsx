import { Box, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import Typewriter from "typewriter-effect";

import { Container } from "components/ui";
import { REACT_APP_URL } from "utils/constants";

export const Hero = () => (
  <Box sx={{ paddingBlock: 3 }}>
    <Container>
      <Stack direction={{ sm: "row" }} alignItems="center" justifyContent="space-between" gap={3}>
        <Box sx={{ maxWidth: 570, width: "100%" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            <Typewriter
              options={{
                strings: [
                  "Hello and welcome to my case!",
                  "My name is Yehor 👋",
                  "I have 2 years of commercial experience in making single-page applications, cross-browser, responsive and mobile layout.",
                  "I work with React.js and related technologies.",
                  "Also I reached the 3rd level at Codewars 🥷",
                  "Feel free to contact with me!"
                ],
                loop: true,
                autoStart: true
              }}
            />
          </Typography>
        </Box>
        <Box sx={{ maxWidth: "474px", width: "100%" }}>
          <Image src={`${REACT_APP_URL}/images/img@1x.png`} duration={0} shift={null} distance={0} easing="linear" width="474" height="614" fit="cover" />
        </Box>
      </Stack>
    </Container>
  </Box>
);
