import { ChangeEvent, FC, useEffect, useMemo } from "react";

import { Pagination as PaginationMUI, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { ICourseCard } from "utils/types";

import { LIMIT } from "..";

interface PaginationProps {
  courses: ICourseCard[];
  page: number;
  changePage: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ courses, page, changePage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsURL = Object.fromEntries(searchParams.entries());

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    changePage(value);
  };

  const totalPages = useMemo(() => {
    if (courses) {
      return Math.ceil(courses.length / LIMIT);
    }
  }, [courses]);

  useEffect(() => {
    setSearchParams({ ...paramsURL, page: `${page}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Stack sx={{ marginTop: "20px" }}>
      <PaginationMUI
        sx={{ display: "flex", justifyContent: "center" }}
        count={totalPages}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};
