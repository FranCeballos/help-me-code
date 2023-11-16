const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
import { setupListeners } from "@reduxjs/toolkit/query";
import { favsApiSlice } from "../features/api/favsApiSlice";
import { subjectsApiSlice } from "../features/api/subjectsApiSlice";

export const store = configureStore({
  reducer: {
    [favsApiSlice.reducerPath]: favsApiSlice.reducer,
    [subjectsApiSlice.reducerPath]: subjectsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(favsApiSlice.middleware)
      .concat(subjectsApiSlice.middleware),
});

setupListeners(store.dispatch);
