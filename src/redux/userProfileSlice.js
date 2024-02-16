import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    currentUser: {},
    isAuthenticated: false,
  },
  reducers: {
    updateCurrentUserReducer: (state, action) => {
      state.currentUser = action.payload;
    },
    updateAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { updateCurrentUserReducer, updateAuthentication } =
  userProfileSlice.actions;
export default userProfileSlice.reducer;
