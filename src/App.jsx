import "./App.css";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Bookmark } from "./pages/Bookmark";
import { Message } from "./pages/Message";
import { Profile } from "./pages/Profile";
import { Notification } from "./pages/Notification";
import { PostDetails } from "./pages/PostDetails";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { SERVER_URL } from "./service/serverURL";
import { useSelector, useDispatch } from "react-redux";
import { addSocketReducer } from "./redux/socketSlice";
import { updateActiveUsers } from "./redux/messageSlice";

function App() {
  const { currentUser, isAuthenticated } = useSelector(
    (state) => state.userProfileSlice,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(SERVER_URL, {
      query: {
        userId: currentUser?._id,
      },
    });
    dispatch(addSocketReducer(socket));

    socket.on("get-user-status", (onlineUsers) => {
      dispatch(updateActiveUsers(onlineUsers));
    });

    return () => {
      socket.off("get-user-status");
    };
  }, [currentUser]);

  return (
    <div className="w-full overflow-hidden h-[100dvh] bg-slate-950 text-slate-300 ">
      <div className="relative h-[100dvh] mx-auto overflow-hidden w-[min(1400px,_calc(100%_-_var(--container-padding,_1rem)))] grid md:grid-cols-[minmax(100px,300px),_minmax(300px,100%)] lg:grid-cols-[minmax(100px,300px),_minmax(300px,100%),_400px]">
        <Routes>
          <Route path="/home" element={isAuthenticated ? <Home /> : <Auth />} />
          <Route path="/" element={<Auth />} />
          <Route path="/signup" element={<Auth signup />} />
          <Route
            path="/bookmark"
            element={isAuthenticated ? <Bookmark /> : <Auth />}
          />
          <Route
            path="/profile/:userId"
            element={isAuthenticated ? <Profile /> : <Auth />}
          />
          <Route
            path="/notification"
            element={isAuthenticated ? <Notification /> : <Auth />}
          />
          <Route
            path="/message"
            element={isAuthenticated ? <Message /> : <Auth />}
          />
          <Route
            path="/post/:id"
            element={isAuthenticated ? <PostDetails /> : <Auth />}
          />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
