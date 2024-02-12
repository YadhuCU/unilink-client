import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPostAPI, getFollowingUsersPostsAPI } from "../service/allAPI";

export const getAllPostsReducer = createAsyncThunk(
  "allPostSlice/getAllPostsReducer",
  async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      return await getAllPostAPI(reqHeader);
    }
  },
);

export const getFollowingUsersPostsReducer = createAsyncThunk(
  "allPostSlice/getFollowingUsersPostsReducer",
  async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      return await getFollowingUsersPostsAPI(reqHeader);
    }
  },
);

const allPostsSlice = createSlice({
  name: "allPostSlice",
  initialState: {
    allPosts: [],
    loading: true,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPostsReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPostsReducer.fulfilled, (state, action) => {
      state.loading = false;

      const result = action.payload;

      if (result.status === 200) {
        state.allPosts = result.data;
      } else {
        state.error = result.response.data;
      }
    });
    builder.addCase(getAllPostsReducer.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getFollowingUsersPostsReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getFollowingUsersPostsReducer.fulfilled,
      (state, action) => {
        state.loading = false;

        const result = action.payload;

        if (result.status === 200) {
          state.allPosts = result.data;
        } else {
          state.error = result.response.data;
        }
      },
    );
    builder.addCase(getFollowingUsersPostsReducer.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default allPostsSlice.reducer;
