import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { Navbar } from "../components/Navbar";
import { Post } from "../components/Post";

Bookmark.propTypes = {};

export function Bookmark() {
  return (
    <>
      <LeftSidebar />
      <div className="home border-x border-slate-900 overflow-y-scroll">
        <div className="sticky top-0 z-50 backdrop-blur-md">
          <Navbar insideBookmark />
        </div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <RightSidebar />
    </>
  );
}
