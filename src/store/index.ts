import { configureStore } from "@reduxjs/toolkit";

import { coursesApi } from "./api";
import { rtkQueryErrorLogger } from "./middlewares";

export const store = configureStore({
  reducer: {
    [coursesApi.reducerPath]: coursesApi.reducer
  },
  middleware: (gDM) => gDM().concat(coursesApi.middleware, rtkQueryErrorLogger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
