import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { MdBookmark } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import { BiSolidComment } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getUserAPI,
  likeOrUnlikePostAPI,
  toggleBookmarkAPI,
} from "../service/allAPI";
import { SERVER_URL } from "../service/serverURL";
import { reqHeaderHelper } from "../utils/reqHeaderHelper";
import { useDispatch } from "react-redux";
import { getAllPostsReducer } from "../redux/allPostsSlice";

Post.propTypes = {
  post: PropTypes.any,
  comment: PropTypes.bool,
};

export function Post({ post, comment }) {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(null);
  const [bookmark, setBookmark] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookmark) {
      if (bookmark?.bookmark?.includes(post?._id)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    }

    const getUser = async () => {
      const token = sessionStorage.getItem("token");
      const { _id } = JSON.parse(sessionStorage.getItem("user"));

      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const result = await getUserAPI(_id, reqHeader);

        if (result.status === 200) {
          setCurrentUser(result.data);
        } else {
          console.log(result.response.data);
        }
      }
    };

    getUser();
  }, [bookmark]);

  const handleNavigate = () => {
    if (!comment) {
      navigate(`/post/${post?._id}`);
    }
  };

  const handleToggleBookmark = async () => {
    const token = sessionStorage.getItem("token");

    const reqBody = {
      postId: post?._id,
    };

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await toggleBookmarkAPI(reqHeader, reqBody);

      if (result.status === 200) {
        setBookmark(result.data);
      } else {
        console.log("error", result.response.data);
      }
    }
  };

  const handleLikeOrUnlike = async () => {
    const reqHeader = reqHeaderHelper();

    const result = await likeOrUnlikePostAPI(post?._id, reqHeader);

    if (result.status === 201) {
      dispatch(getAllPostsReducer());
    } else {
      console.log("liked", result.data);
    }
  };

  return (
    <div className="flex gap-4 items-start p-4 border-b-2 border-slate-900">
      <Avatar
        name={post?.user?.name}
        src={
          (post?.user?.profilePicture &&
            `${SERVER_URL}/user-image/${post?.user?.profilePicture}`) ||
          post?.user?.googlePicture
        }
      />
      <div className="flex flex-col flex-grow flex-shrink gap-4">
        <div className="flex gap-1 ">
          <Link to={`/profile/${post?.user?._id}`}>
            <p className="text-sm md:text-md font-semibold">
              {post?.user?.name}
            </p>
          </Link>
          <p className="text-sm md:text-md font-normal text-slate-500">
            @{post?.user?.username}
          </p>
          <div className=" ml-auto">
            <Menu>
              <MenuButton
                px={3}
                py={3}
                transition="all 0.2s"
                borderRadius="full"
                _hover={{ bg: "#1e293b" }}
              >
                <BsThreeDots />
              </MenuButton>
              <MenuList className="bg-slate-800 text-slate-300">
                <MenuItem onClick={() => navigate(`/post/${post?._id}`)}>
                  view post
                </MenuItem>
                <MenuItem
                  onClick={() => navigate(`/profile/${post?.user?._id}`)}
                >
                  view user
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <div
          onClick={handleNavigate}
          className="flex flex-col p-4 gap-4 border-2 rounded-xl border-slate-800"
        >
          <span
            role="textbox"
            contentEditable="false"
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{
              __html: post?.postText ? post?.postText : "",
            }}
          />
          {post?.postImage && (
            <img
              className="rounded-lg border-2 border-slate-900"
              src={`${SERVER_URL}/post-image/${post?.postImage}`}
            />
          )}
        </div>

        <div className="flex justify-between py-2  text-slate-500">
          <div
            onClick={handleLikeOrUnlike}
            className=" cursor-pointer flex items-center gap-2"
          >
            <IoHeart
              className={`${
                post?.postLikes?.includes(currentUser?._id) && "text-red-700 "
              } text-lg`}
            />
            <p className="text-xs text-red-700">
              {post?.postLikes?.length > 0 ? post?.postLikes?.length : ""}
            </p>
          </div>
          {comment || (
            <div
              onClick={handleNavigate}
              className=" cursor-pointer flex items-center gap-2"
            >
              <BiSolidComment className="text-lg" />
              <p className="text-xs text-slate-600">
                {post?.postComments?.length > 0
                  ? post?.postComments?.length
                  : ""}
              </p>
            </div>
          )}
          <div
            onClick={handleToggleBookmark}
            className=" cursor-pointer flex items-center gap-2"
          >
            <MdBookmark
              className={`${
                currentUser?.bookmark?.includes(post?._id) && "text-yellow-500"
              } text-lg`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
