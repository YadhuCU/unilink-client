import "./App.css";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Bookmark } from "./pages/Bookmark";
import { Message } from "./pages/Message";
import { Profile } from "./pages/Profile";
import { Notification } from "./pages/Notification";
import { PostDetails } from "./pages/PostDetails";

function App() {
  return (
    <div className="w-full overflow-hidden h-[100dvh] bg-slate-950 text-slate-300 ">
      <div className="relative h-[100dvh] mx-auto overflow-hidden w-[min(1400px,_calc(100%_-_var(--container-padding,_1rem)))] grid md:grid-cols-[minmax(100px,300px),_minmax(300px,100%)] lg:grid-cols-[minmax(100px,300px),_minmax(300px,100%),_400px]">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Auth />} />
          <Route path="/signup" element={<Auth signup />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/message" element={<Message />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
