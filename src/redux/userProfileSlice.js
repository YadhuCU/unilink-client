import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    currentUser: {},
  },
  reducers: {
    updateCurrentUserReducer: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { updateCurrentUserReducer } = userProfileSlice.actions;
export default userProfileSlice.reducer;
