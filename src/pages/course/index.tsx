import { FC, useEffect, useState } from "react";

import { Box, Breadcrumbs, Link, Rating, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "mui-image";
import { Link as RouterLink, useParams } from "react-router-dom";

import { Created, Duration, Lessons } from "components/cards/course-card/components";
import { Container, Loader } from "components/ui";
import { CourseService } from "services";
import { ICourseInfo } from "utils/types";

import { PlayerBox } from "./components/player-box";

const Demo = styled("div")(() => ({
  borderRadius: "6px",
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "#E7EBF0"
}));

const Course: FC = () => {
  const { courseId } = useParams();
  const [info, setInfo] = useState<ICourseInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const getCourseInfo = async (id: string) => {
    try {
      setLoading(true);
      const response = await CourseService.getCourseInfo(id).then((response) => response.json());

      setInfo(response);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      getCourseInfo(courseId);
    }
  }, [courseId]);

  return (
    <Box sx={{ paddingBlock: "20px" }}>
      {loading || !info ? (
        <Loader />
      ) : (
        <Container>
          <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "20px" }}>
            <Link component={RouterLink} underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Typography color="text.primary">{info?.title}</Typography>
          </Breadcrumbs>
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="h4" component="h1">
              {info?.title}
            </Typography>
            <Rating name="course-rating" defaultValue={info?.rating} size="large" precision={0.5} readOnly />
          </Box>
          <Demo>
            <Stack direction="row" gap={2}>
              <Box sx={{ maxWidth: "300px" }}>
                <Image
                  src={`${info?.previewImageLink as string}/cover.webp`}
                  duration={0}
                  shift={null}
                  distance={0}
                  easing="linear"
                  width="300"
                  height="170"
                  fit="cover"
                />
              </Box>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Created launchDate={info?.launchDate || ""} />
                  <Duration duration={info?.duration || 0} />
                  <Lessons lessonsCount={info?.lessons.length || 1} />
                </Stack>
                <Typography variant="body2">{info?.description}</Typography>
              </Stack>
            </Stack>
          </Demo>
          <PlayerBox lessons={info?.lessons || []} />
        </Container>
      )}
    </Box>
  );
};

export default Course;
