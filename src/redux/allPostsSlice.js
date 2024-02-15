import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPostAPI,
  getFollowingUsersPostsAPI,
  getUserPostsAPI,
  getUserRepliedPostsAPI,
  getUserLikedPostsAPI,
} from "../service/allAPI";

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

export const getUsersPostsReducer = createAsyncThunk(
  "allPostSlice/getUsersPostsReducer",
  async (userId) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      return await getUserPostsAPI(userId, reqHeader);
    }
  },
);

export const getUsersRepliedPostsReducer = createAsyncThunk(
  "allPostSlice/getUsersRepliedPostsReducer",
  async (userId) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      return await getUserRepliedPostsAPI(userId, reqHeader);
    }
  },
);

export const getUsersLikedPostsReducer = createAsyncThunk(
  "allPostSlice/getUsersLikedPostsReducer",
  async (userId) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      return await getUserLikedPostsAPI(userId, reqHeader);
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
    builder.addCase(getUsersPostsReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersPostsReducer.fulfilled, (state, action) => {
      state.loading = false;

      const result = action.payload;

      if (result.status === 200) {
        state.allPosts = result.data;
      } else {
        state.error = result.response.data;
      }
    });
    builder.addCase(getUsersPostsReducer.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getUsersRepliedPostsReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersRepliedPostsReducer.fulfilled, (state, action) => {
      state.loading = false;

      const result = action.payload;

      if (result.status === 200) {
        state.allPosts = result.data;
      } else {
        state.error = result.response.data;
      }
    });
    builder.addCase(getUsersRepliedPostsReducer.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getUsersLikedPostsReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersLikedPostsReducer.fulfilled, (state, action) => {
      state.loading = false;

      const result = action.payload;

      if (result.status === 200) {
        state.allPosts = result.data;
      } else {
        state.error = result.response.data;
      }
    });
    builder.addCase(getUsersLikedPostsReducer.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default allPostsSlice.reducer;
