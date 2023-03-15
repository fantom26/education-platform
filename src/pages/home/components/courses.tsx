import { ChangeEvent, useMemo, useState } from "react";

import { Box, Pagination, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import { CourseCard } from "components/cards";
import { Container, Loader } from "components/ui";
import { useGetCoursesQuery } from "store/api";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary
}));

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
                <Item key={course.id}>
                  <CourseCard {...course} />
                </Item>
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
