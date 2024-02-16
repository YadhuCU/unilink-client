import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reqHeaderHelper } from "../utils/reqHeaderHelper";
import { getAllConversationsAPI } from "../service/allAPI";
import { getMessageAPI } from "../service/allAPI";

// get all conversations
export const getAllConversationsReducer = createAsyncThunk(
  "messageSlice/getAllConversationsReducer",
  async () => {
    const reqHeader = reqHeaderHelper("application/json");
    if (reqHeader) {
      return await getAllConversationsAPI(reqHeader);
    }
  },
);

// get messages.
export const getMessageReducer = createAsyncThunk(
  "messageSlice/getMessageReducer",
  async (id) => {
    const reqHeader = reqHeaderHelper("application/json");
    if (reqHeader) {
      return await getMessageAPI(id, reqHeader);
    }
  },
);

const messageSlice = createSlice({
  name: "messageSlice",
  initialState: {
    allConversation: [],
    currentChat: [],
    allConversationLoading: false,
    currentChatUser: "",
    activeUsers: [],
    latestMessage: {},
  },
  reducers: {
    addCurrentChatUserReducer: (state, action) => {
      state.currentChatUser = action.payload;
    },
    updateActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
    updateLatesteMessage: (state, action) => {
      state.latestMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllConversationsReducer.pending, (state) => {
      state.allConversationLoading = true;
    });
    builder.addCase(getAllConversationsReducer.fulfilled, (state, action) => {
      state.allConversationLoading = false;
      if (action.payload.status === 200) {
        state.allConversation = action.payload.data;
      }
    });
    builder.addCase(getAllConversationsReducer.rejected, (state) => {
      state.allConversationLoading = false;
    });
    builder.addCase(getMessageReducer.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.currentChat = action.payload.data;
      }
    });
  },
});

export default messageSlice.reducer;
export const {
  addCurrentChatUserReducer,
  updateActiveUsers,
  updateLatesteMessage,
} = messageSlice.actions;
