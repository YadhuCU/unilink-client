import PropTypes from "prop-types";
import { Navbar } from "../components/Navbar";
import { LuImagePlus } from "react-icons/lu";
import { Button } from "../components/utils/Button";
import { useRef, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Post } from "../components/Post";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { useParams } from "react-router-dom";
import { getPostAPI } from "../service/allAPI";
import { Avatar } from "@chakra-ui/react";
import { SERVER_URL } from "../service/serverURL";

PostDetails.propTypes = {};

export function PostDetails() {
  const textRef = useRef(null);
  const [comment, setComment] = useState({
    commentText: "",
    commentImage: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getPost();
    getUserFromSession();
  }, []);

  const getUserFromSession = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    if (
      comment.commentImage.type == "image/png" ||
      comment.commentImage.type == "image/jpg" ||
      comment.commentImage.type == "image/jpeg"
    ) {
      setImagePreview(URL.createObjectURL(comment.commentImage));
    } else {
      setComment({ ...comment, commentImage: "" });
      setImagePreview("");
    }
  }, [comment.commentImage]);

  const getPost = async () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await getPostAPI(id, reqHeader);

      if (result.status === 200) {
        setPost(result.data);
      } else {
        console.log("error", result.response.data);
      }
    }
  };

  const handleKeyUp = () => {
    const textarea = textRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setComment({ ...comment, commentText: textarea.value });
  };

  const handleCreatPost = () => {
    console.log("Button is working");
    if (comment.commentImage || comment.commentText) {
      console.log(comment);
    }
  };

  const handleClear = () => {
    const textarea = textRef.current;
    textarea.style.height = "auto";
    setComment({ commentText: "", commentImage: "" });
  };

  return (
    <>
      <LeftSidebar />
      <div className="home border-x border-slate-900 overflow-y-scroll">
        <div className="sticky top-0 z-50 backdrop-blur-md">
          <Navbar insidePost />
        </div>
        <Post post={post} />
        <div className="add-post p-4 pb-0 flex items-start  shadow-xl shadow-slate-900  gap-2 border-b-2 border-slate-900">
          <Avatar
            name={user?.name}
            src={
              (user?.profilePicture &&
                `${SERVER_URL}/user-image/${user?.profilePicture}`) ||
              user?.googlePicture
            }
          />
          <div className="flex flex-col flex-grow ">
            <textarea
              ref={textRef}
              className="w-full text-lg font-semibold bg-transparent outline-none resize-none px-2 py-2 mt-px mb-2"
              rows="1"
              value={comment.commentText}
              onChange={(e) => handleKeyUp(e)}
              autoCorrect="false"
              placeholder="Post your Replay..."
            ></textarea>
            {imagePreview && (
              <div className="py-2 relative">
                <div
                  onClick={() => setComment({ ...comment, commentImage: "" })}
                  className="absolute left-0 p-3 rounded-full cursor-pointer bg-slate-900 hover:bg-slate-800 transition"
                >
                  <FaTrash className="text-lg" />
                </div>
                <img src={imagePreview} width={300} />
              </div>
            )}
            <div className="flex gap-4 w-full border-t-2 border-slate-900 py-3">
              <label className="p-3 rounded-full hover:bg-slate-900 transition cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setComment({ ...comment, commentImage: e.target.files[0] })
                  }
                />
                <LuImagePlus className="text-xl" />
              </label>
              {(comment.commentText || comment.commentImage) && (
                <div
                  onClick={handleClear}
                  className=" p-3 rounded-full cursor-pointer hover:bg-slate-800 transition ml-auto"
                >
                  <FaTrash className="text-lg" />
                </div>
              )}
              <Button
                buttonClick={handleCreatPost}
                classes={`${
                  comment.commentText || comment.commentImage || "ml-auto"
                } py-px`}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
        {/* <Post post={{ ...comment, postImage: imagePreview }} comment /> */}
      </div>
      <RightSidebar />
    </>
  );
}
