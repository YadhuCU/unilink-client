import { configureStore } from "@reduxjs/toolkit";
import userProfileSlice from "./userProfileSlice";
import allPostsSlice from "./allPostsSlice";

const store = configureStore({
  reducer: {
    userProfileSlice: userProfileSlice,
    allPostsSlice: allPostsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
