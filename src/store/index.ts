import { configureStore } from "@reduxjs/toolkit";

import { coursesApi } from "./api";

export const store = configureStore({
  reducer: {
    [coursesApi.reducerPath]: coursesApi.reducer
  },
  middleware: (gDM) => gDM().concat(coursesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
