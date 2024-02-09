import PropTypes from "prop-types";
import { Navbar } from "../components/Navbar";
import { LuImagePlus } from "react-icons/lu";
import { Button } from "../components/utils/Button";
import { useRef, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Post } from "../components/Post";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { dummyPost } from "../service/dummy";
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createPostAPI, getAllPostAPI } from "../service/allAPI.js";
import { useToast } from "@chakra-ui/react";

Home.propTypes = {};

export function Home() {
  const textRef = useRef(null);
  const [post, setPost] = useState({
    postText: "",
    postImage: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const toast = useToast();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    setUser(JSON.parse(user));

    if (!token) navigate("/");

    getAllPosts();
  }, []);

  useEffect(() => {
    if (
      post.postImage.type == "image/png" ||
      post.postImage.type == "image/jpg" ||
      post.postImage.type == "image/jpeg"
    ) {
      setImagePreview(URL.createObjectURL(post.postImage));
    } else {
      setPost({ ...post, postImage: "" });
      setImagePreview("");
    }
  }, [post.postImage]);

  const getAllPosts = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      const result = await getAllPostAPI(reqHeader);
      if (result.status === 200) {
        setAllPosts(result.data);
      } else {
        console.log("error", result.response.data);
      }
    }
  };

  const handleKeyUp = () => {
    const textarea = textRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setPost({ ...post, postText: textarea.value });
  };

  const handleCreatPost = async () => {
    if (post.postImage || post.postText) {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const result = await createPostAPI(reqHeader, post);
        if (result.status === 201) {
          toast({
            title: "Success",
            description: "Post created successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          handleClear();
        } else {
          toast({
            title: "Error",
            description: result.response.data,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      }
    }
  };

  const handleClear = () => {
    const textarea = textRef.current;
    textarea.style.height = "auto";
    setPost({ postText: "", postImage: "" });
  };

  return (
    <>
      <LeftSidebar insideHome />
      <div className="home border-x border-slate-900 overflow-y-scroll">
        <div className="sticky top-0 z-50 backdrop-blur-md">
          <Navbar insideHome />
        </div>
        <div className="add-post p-4 pb-0 flex items-start gap-2 border-b-2 border-slate-900">
          <Avatar name={user?.name} src={user?.googlePicture} />
          <div className="flex flex-col flex-grow ">
            <textarea
              ref={textRef}
              className="w-full text-lg font-semibold bg-transparent outline-none resize-none px-2 py-2 mt-px mb-2"
              rows="1"
              value={post.postText}
              onChange={(e) => handleKeyUp(e)}
              autoCorrect="false"
              placeholder="Post your thoughts..."
            ></textarea>
            {imagePreview && (
              <div className="py-2 relative">
                <div
                  onClick={() => setPost({ ...post, postImage: "" })}
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
                    setPost({ ...post, postImage: e.target.files[0] })
                  }
                />
                <LuImagePlus className="text-xl" />
              </label>
              {(post.postText || post.postImage) && (
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
                  post.postText || post.postImage || "ml-auto"
                } py-px`}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
        {allPosts?.length > 0 &&
          allPosts.map((item, index) => <Post post={item} key={index} />)}
      </div>
      <RightSidebar />
    </>
  );
}
