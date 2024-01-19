const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
import { setupListeners } from "@reduxjs/toolkit/query";
import { favsApiSlice } from "./api/favsApiSlice";
import { subjectsApiSlice } from "./api/subjectsApiSlice";
import { categoryApiSlice } from "./api/categoryApiSlice";
import adminReducer from "./states/adminSlice";

export const store = configureStore({
  reducer: {
    manager: adminReducer,
    [favsApiSlice.reducerPath]: favsApiSlice.reducer,
    [subjectsApiSlice.reducerPath]: subjectsApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(favsApiSlice.middleware)
      .concat(subjectsApiSlice.middleware)
      .concat(categoryApiSlice.middleware),
});

setupListeners(store.dispatch);
