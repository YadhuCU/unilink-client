import { configureStore } from "@reduxjs/toolkit";
import userProfileSlice from "./userProfileSlice";
import allPostsSlice from "./allPostsSlice";
import messageSlice from "./messageSlice";

const store = configureStore({
  reducer: {
    userProfileSlice: userProfileSlice,
    allPostsSlice: allPostsSlice,
    messageSlice: messageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
