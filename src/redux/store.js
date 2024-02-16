import { configureStore } from "@reduxjs/toolkit";
import userProfileSlice from "./userProfileSlice";
import allPostsSlice from "./allPostsSlice";
import messageSlice from "./messageSlice";
import socketSlice from "./socketSlice";

const store = configureStore({
  reducer: {
    userProfileSlice: userProfileSlice,
    allPostsSlice: allPostsSlice,
    messageSlice: messageSlice,
    socketSlice: socketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
