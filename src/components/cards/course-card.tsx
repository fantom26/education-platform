import { FC, useRef, useState } from "react";

import { AccessTime, Event, PlayCircle } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import { REACT_APP_URL } from "utils/constants";
import { ICourse } from "utils/types";

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

  const createdAt = dayjs(launchDate).format("DD MMMM YYYY");

  const formattedDuration = () => {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  const handleMouseMove = (videoSlug: string) => {
    setVideoShowed(true);

    if (videoShowed) return;
    console.log("0");
    if (cachedVideos.length > 0) {
      const currentVideo = cachedVideos.find(({ slug }) => slug === courseSlug);

      if (currentVideo) {
        if (videoRef.current) {
          console.log("1");
          videoRef.current.currentTime = currentVideo.time || 0;
          videoRef.current.play();
        }
      } else {
        setCachedVideos((prev) => [...prev, { slug: videoSlug, time: null }]);
        if (videoRef.current) {
          console.log("2");
          videoRef.current.play();
        }
      }
    } else {
      setCachedVideos([{ slug: videoSlug, time: null }]);
      if (videoRef.current) {
        console.log("3");
        videoRef.current.play();
      }
    }
  };

  const handleMouseLeave = (videoSlug: string) => {
    setVideoShowed(false);

    if (videoRef.current) {
      console.log("paused");
      videoRef.current.pause();
      setCachedVideos((prev) => [
        ...prev.filter(({ slug }) => slug !== videoSlug),
        { slug: videoSlug, time: (videoRef.current as HTMLVideoElement).currentTime }
      ]);
    }
  };

  return (
    <Card
      sx={{ minWidth: 275, display: "flex", justifyContent: "space-between", gap: 3 }}
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
        <video ref={videoRef} muted={true} style={videoShowed ? shownVideoStyles : unShownVideoStyles}>
          <source src={`${REACT_APP_URL}/video.mp4`} type="video/mp4" />
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
            <Stack direction="row" spacing={1}>
              {skills.map((skill, index) => (
                <Chip key={index} label={skill} />
              ))}
            </Stack>
          </Box>
          <Stack direction="row" spacing={1}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Event />
              <Typography align="left" variant="body2">
                {createdAt}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTime />
              {formattedDuration()}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PlayCircle />
              <Typography align="left" variant="body2">
                {lessonsCount}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Rating name="course-rating" defaultValue={rating} precision={0.5} readOnly />
        <Button variant="contained">See course</Button>
      </CardActions>
    </Card>
  );
};
