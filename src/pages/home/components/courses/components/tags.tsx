import { FC, useMemo } from "react";

import { Chip, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { ICourseCard } from "utils/types";

export const Tags: FC<{ courses: ICourseCard[] }> = ({ courses }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsURL = Object.fromEntries(searchParams.entries());

  const tags = useMemo(() => [...new Set(courses.map(({ tags }) => tags).flat(1))], [courses]);

  const handleClick = (tag: string) => {
    const tagsURL = paramsURL?.tags?.split(",");

    if (tagsURL?.length) {
      setSearchParams({ ...paramsURL, tags: [...tagsURL, tag].join(","), page: "1" });
    } else {
      setSearchParams({ ...paramsURL, tags: tag, page: "1" });
    }
  };

  const handleDelete = (tag: string) => {
    const tagsURL = paramsURL?.tags.split(",").filter((queryTag) => queryTag !== tag);

    if (tagsURL.length > 0) {
      setSearchParams({ ...paramsURL, tags: tagsURL.join(","), page: "1" });
    } else {
      searchParams.delete("tags");
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: "1" });
    }
  };

  return (
    <Stack direction="row" gap={2} flexWrap="wrap" sx={{ marginBottom: "30px" }}>
      {tags?.map((tag, index) =>
        paramsURL?.tags?.includes(tag) ? (
          <Chip key={index} label={tag} onDelete={() => handleDelete(tag)} />
        ) : (
          <Chip key={index} label={tag} onClick={() => handleClick(tag)} />
        )
      )}
    </Stack>
  );
};
