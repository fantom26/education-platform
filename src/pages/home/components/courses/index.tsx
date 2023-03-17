import { useEffect, useMemo, useState } from "react";

import { Box, Paper, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { CourseCard } from "components/cards";
import { Container, Loader } from "components/ui";
import { useGetCoursesQuery } from "store/api";

import { Pagination } from "./components/pagination";
import { Tags } from "./components/tags";

export const LIMIT = 10;

export const Courses = () => {
  const { data, isLoading } = useGetCoursesQuery();
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const paramsURL = Object.fromEntries(searchParams.entries());
  const [indexes, setIndexes] = useState({
    startIndex: 0,
    endIndex: 0
  });

  const changePage = (page: number) => {
    setPage(page);
  };

  const filteredCourses = useMemo(() => {
    const tagsString = paramsURL.tags;

    if (tagsString) {
      const tagsArr = tagsString.split(",");
      return data?.courses.filter(({ tags }) => tags.some((tag) => tagsArr.includes(tag)));
    }

    return data?.courses;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsURL]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const paginatedCourses = useMemo(() => filteredCourses?.slice(indexes.startIndex, indexes.endIndex), [filteredCourses, indexes.startIndex, indexes.endIndex]);

  // In this useEffect I sync local page and url page
  useEffect(() => {
    setPage(+paramsURL?.page);
    setIndexes({
      startIndex: (+paramsURL?.page - 1) * LIMIT,
      endIndex: +paramsURL?.page * LIMIT
    });
  }, [paramsURL?.page]);

  return (
    <Box sx={{ paddingBlock: 3 }}>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Tags courses={data?.courses || []} />
            <Stack spacing={3}>
              {paginatedCourses?.map((course) => (
                <Paper key={course.id}>
                  <CourseCard {...course} />
                </Paper>
              ))}
            </Stack>
            {(filteredCourses?.length || 0) > LIMIT && <Pagination courses={filteredCourses || []} page={page} changePage={changePage} />}
          </>
        )}
      </Container>
    </Box>
  );
};
