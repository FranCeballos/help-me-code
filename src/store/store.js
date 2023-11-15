const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
import { setupListeners } from "@reduxjs/toolkit/query";
import { favsApiSlice } from "../features/api/favsApiSlice";

export const store = configureStore({
  reducer: {
    [favsApiSlice.reducerPath]: favsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favsApiSlice.middleware),
});

setupListeners(store.dispatch);
