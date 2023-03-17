import { FC, useRef, useState } from "react";

import { Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";

import { useHLSPlayer } from "hooks";
import { ICourseCard } from "utils/types";

import { CourseCardActions, Created, Duration, Lessons, Skills } from "./components";

const shownVideoStyles = {
  height: "100%",
  width: "100%"
};

const unShownVideoStyles = {
  position: "absolute",
  clipPath: "inset(50%)",
  overflow: "hidden",
  width: "1px",
  height: "1px",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)"
};

export const CourseCard: FC<ICourseCard> = (props) => {
  const { id, title, description, previewImageLink, rating, duration, launchDate, lessonsCount, containsLockedLessons: isPaid, meta } = props;
  const { skills, courseVideoPreview } = meta;
  const [videoShowed, setVideoShowed] = useState(false);
  const playerRef = useRef<HTMLVideoElement | null>(null);
  useHLSPlayer({ link: courseVideoPreview.link as string, playerRef });

  const handleMouseMove = () => {
    setVideoShowed(true);
    playerRef.current?.play();
  };

  const handleMouseLeave = () => {
    setVideoShowed(false);
    playerRef.current?.pause();
  };

  return (
    <Card
      sx={{ minWidth: 275, minHeight: 225, display: "flex", justifyContent: "space-between", gap: 3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          position: "relative",
          maxWidth: "300px",
          width: "100%"
        }}
      >
        <video ref={playerRef} muted preload="metadata" loop style={videoShowed ? shownVideoStyles : unShownVideoStyles}></video>
        {!videoShowed && (
          <>
            <Box
              sx={{
                position: "absolute",
                top: "15px",
                left: 0,
                padding: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "75px",
                color: "#ffffff",
                backgroundColor: "info.main"
              }}
            >
              <Typography align="left" variant="body2">
                {isPaid ? "Premium" : "Free"}
              </Typography>
            </Box>
            <CardMedia sx={{ height: "100%", width: "100%" }} image={`${previewImageLink}/cover.webp`} title="Course preview" />
          </>
        )}
      </Box>

      <CardContent sx={{ maxWidth: 600, marginRight: "auto", paddingTop: 1, paddingLeft: 1, display: "flex", flexDirection: "column" }}>
        <Stack sx={{ height: "100%" }} spacing={2}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
            <Typography align="left" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography align="left" variant="body2">
              {description}
            </Typography>
            <Skills skills={skills} />
          </Box>
          <Stack direction="row" spacing={1}>
            <Created launchDate={launchDate} />
            <Duration duration={duration} />
            <Lessons lessonsCount={lessonsCount} />
          </Stack>
        </Stack>
      </CardContent>

      <CourseCardActions id={id} rating={rating} />
    </Card>
  );
};
