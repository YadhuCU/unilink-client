import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socketSlice",
  initialState: {
    socket: {},
  },
  reducers: {
    addSocketReducer: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { addSocketReducer } = socketSlice.actions;
export default socketSlice.reducer;
