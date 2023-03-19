import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { REACT_APP_API_HOST, REACT_APP_API_VERSION } from "utils/constants";
import { ICourseCard } from "utils/types";

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_API_HOST}/${REACT_APP_API_VERSION}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
      }
    }
  }),
  endpoints: (builder) => ({
    getCourses: builder.query<{ courses: ICourseCard[] }, void>({
      query: () => ({
        url: "/core/preview-courses"
      })
    })
  })
});

export const { useGetCoursesQuery } = coursesApi;
