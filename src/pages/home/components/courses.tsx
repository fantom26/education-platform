import { ChangeEvent, useMemo, useState } from "react";

import { Box, Pagination, Paper, Stack } from "@mui/material";

import { CourseCard } from "components/cards";
import { Container, Loader } from "components/ui";
import { useGetCoursesQuery } from "store/api";

const LIMIT = 10;

export const Courses = () => {
  const { data, isLoading } = useGetCoursesQuery();
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    if (data?.courses) {
      return Math.ceil(data?.courses.length / LIMIT);
    }
  }, [data?.courses]);

  const startIndex = (page - 1) * LIMIT;
  const endIndex = page * LIMIT;

  const paginatedCourses = useMemo(() => data?.courses.slice(startIndex, endIndex), [data?.courses, startIndex, endIndex]);

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ paddingBlock: 3 }}>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Stack spacing={3}>
              {paginatedCourses?.map((course) => (
                <Paper key={course.id}>
                  <CourseCard {...course} />
                </Paper>
              ))}
            </Stack>
            <Stack sx={{ marginTop: "20px" }}>
              <Pagination
                sx={{ display: "flex", justifyContent: "center" }}
                count={totalPages}
                page={page}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </>
        )}
      </Container>
    </Box>
  );
};
