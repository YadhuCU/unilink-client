import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { Navbar } from "../components/Navbar";
import { Post } from "../components/Post";
import { dummyPost } from "../service/dummy";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

Bookmark.propTypes = {};

export function Bookmark() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) navigate("/");
  }, []);

  return (
    <>
      <LeftSidebar />
      <div className="home border-x border-slate-900 overflow-y-scroll">
        <div className="sticky top-0 z-50 backdrop-blur-md">
          <Navbar insideBookmark />
        </div>
        {dummyPost.reverse().map((item, index) => (
          <Post post={item} key={index} />
        ))}
        <Post />
      </div>
      <RightSidebar />
    </>
  );
}
