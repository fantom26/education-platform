import { FC, useRef, useState } from "react";

import { Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";

import { ICourse } from "utils/types";

import { CourseCardActions } from "./components/actions";
import { Created } from "./components/created";
import { Duration } from "./components/duration";
import { Lessons } from "./components/lessons";
import { Skills } from "./components/skills";

interface IVideoInfo {
  slug: string;
  time: number | null;
}

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

export const CourseCard: FC<ICourse> = (props) => {
  const { title, description, previewImageLink, rating, duration, launchDate, lessonsCount, containsLockedLessons: isPaid, meta } = props;
  const { slug: courseSlug, skills, courseVideoPreview } = meta;
  const [cachedVideos, setCachedVideos] = useState<IVideoInfo[]>([]);
  const [videoShowed, setVideoShowed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseMove = (videoSlug: string) => {
    setVideoShowed(true);

    if (videoShowed) return;

    if (cachedVideos.length > 0) {
      const currentVideo = cachedVideos.find(({ slug }) => slug === courseSlug);

      if (currentVideo) {
        if (videoRef.current) {
          videoRef.current.currentTime = currentVideo.time || 0;
          videoRef.current.play();
        }
      } else {
        setCachedVideos((prev) => [...prev, { slug: videoSlug, time: null }]);
        if (videoRef.current) {
          videoRef.current.play();
        }
      }
    } else {
      setCachedVideos([{ slug: videoSlug, time: null }]);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  };

  const handleMouseLeave = (videoSlug: string) => {
    setVideoShowed(false);

    if (videoRef.current) {
      videoRef.current.pause();
      setCachedVideos((prev) => [
        ...prev.filter(({ slug }) => slug !== videoSlug),
        { slug: videoSlug, time: (videoRef.current as HTMLVideoElement).currentTime }
      ]);
    }
  };

  return (
    <Card
      sx={{ minWidth: 275, minHeight: 225, display: "flex", justifyContent: "space-between", gap: 3 }}
      onMouseMove={() => handleMouseMove(courseSlug)}
      onMouseLeave={() => handleMouseLeave(courseSlug)}
    >
      <Box
        sx={{
          position: "relative",
          maxWidth: "300px",
          width: "100%"
        }}
      >
        <video ref={videoRef} muted={true} preload="auto" style={videoShowed ? shownVideoStyles : unShownVideoStyles}>
          <source src={courseVideoPreview.link as string} type="application/x-mpegURL" />
        </video>
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

      <CardContent sx={{ maxWidth: 500, marginRight: "auto", paddingTop: 1, paddingLeft: 1, display: "flex", flexDirection: "column" }}>
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

      <CourseCardActions rating={rating} />
    </Card>
  );
};
