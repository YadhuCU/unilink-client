import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { Navbar } from "../components/Navbar";
import { Post } from "../components/Post";
import { dummyPost } from "../service/dummy";
import { useEffect, useState } from "react";
import { getBookmarkPostsAPI } from "../service/allAPI";

Bookmark.propTypes = {};

export function Bookmark() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    getAllBookmarkedPost();
  }, []);

  const getAllBookmarkedPost = async () => {
    const token = sessionStorage.getItem("token");
    const { _id } = JSON.parse(sessionStorage.getItem("user"));

    console.log("token", token);
    console.log("_id", _id);

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await getBookmarkPostsAPI(_id, reqHeader);

      if (result.status === 200) {
        console.log("result-bookmark", result);
        setBookmarkedPosts(result.data);
      } else {
        console.log("Error", result.response.data);
      }
    }
  };

  return (
    <>
      <LeftSidebar />
      <div className="home border-x border-slate-900 overflow-y-scroll">
        <div className="sticky top-0 z-50 backdrop-blur-md">
          <Navbar insideBookmark />
        </div>
        {bookmarkedPosts?.length > 0 &&
          bookmarkedPosts
            .reverse()
            .map((item, index) => <Post post={item} key={index} />)}
      </div>
      <RightSidebar />
    </>
  );
}
