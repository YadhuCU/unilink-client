import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RiMailAddLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import {
  getAllPostsReducer,
  getFollowingUsersPostsReducer,
  getUsersPostsReducer,
  getUsersRepliedPostsReducer,
  getUsersLikedPostsReducer,
} from "../redux/allPostsSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserAPI } from "../service/allAPI.js";
import { reqHeaderHelper } from "../utils/reqHeaderHelper.js";
import { Avatar } from "@chakra-ui/react";
import { SERVER_URL } from "../service/serverURL.js";

Navbar.propTypes = {
  insideHome: PropTypes.bool,
  insideBookmark: PropTypes.bool,
  insideNotification: PropTypes.bool,
  insideProfile: PropTypes.bool,
  insideProfileDetail: PropTypes.bool,
  insideMessage: PropTypes.bool,
  insideChat: PropTypes.bool,
  insidePost: PropTypes.bool,
  buttonClick: PropTypes.func,
};
MessageNavbar.propTypes = {
  buttonClick: PropTypes.func,
};
export function Navbar({
  insideHome,
  insideBookmark,
  insideNotification,
  insideProfile,
  insideProfileDetail,
  insideMessage,
  insideChat,
  insidePost,
  buttonClick,
}) {
  return (
    <>
      {insideHome && <HomeNavbar />}
      {insideBookmark && <BookmarkNavbar />}
      {insideNotification && <NotificationNavbar />}
      {insideProfile && <ProfileNavbar />}
      {insideProfileDetail && <ProfileDetailNavbar />}
      {insideMessage && <MessageNavbar buttonClick={buttonClick} />}
      {insideChat && <ChatNavbar />}
      {insidePost && <PostNavbar />}
    </>
  );
}

function HomeNavbar() {
  const activeDivRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostsReducer());
  }, []);

  // handling the change effect when clicking the options
  useEffect(() => {
    const listItems = activeDivRef.current
      ? activeDivRef.current.childNodes
      : null;

    if (listItems?.length > 0) {
      listItems[0].firstChild.classList.add("active");
    }

    const handleClick = (event) => {
      listItems.forEach((item) => {
        item.firstChild.classList.remove("active");
      });

      if (event.target.localName == "li") {
        event.target.classList.add("active");
      } else {
        event.target.firstChild.classList.add("active");
      }
    };

    listItems?.length > 0 &&
      listItems.forEach((item) => {
        item.addEventListener("click", handleClick);
      });

    return () => {
      listItems?.length > 0 &&
        listItems.forEach((item) => {
          item.removeEventListener("click", handleClick);
        });
    };
  }, []);
  return (
    <div
      ref={activeDivRef}
      className="w-full h-[50px] flex items-center border-b border-slate-900"
    >
      <ul
        onClick={() => dispatch(getAllPostsReducer())}
        className="h-full w-full flex justify-center items-center font-semibold text-slate-300 transition  hover:bg-slate-900  cursor-pointer"
      >
        <li className="h-full relative flex items-center">For you</li>
      </ul>
      <ul
        onClick={() => dispatch(getFollowingUsersPostsReducer())}
        className="h-full w-full flex justify-center items-center font-semibold text-slate-300 transition hover:bg-slate-900  cursor-pointer"
      >
        <li className="h-full relative flex items-center">Following</li>
      </ul>
    </div>
  );
}

function BookmarkNavbar() {
  return (
    <div className="w-full px-5 py-2 flex items-start border-b-2 border-slate-900">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-slate-100">Bookmark</h3>
        <p className="text-md text-slate-500">@yadhu_cu</p>
      </div>
      <div className="p-2 ml-auto rounded-full hover:bg-slate-900 transition cursor-pointer">
        <BsThreeDots />
      </div>
    </div>
  );
}

function NotificationNavbar() {
  return (
    <div className="w-full px-5 py-2 flex items-start border-b-2 border-slate-900">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-slate-100">Notification</h3>
        <p className="text-md text-slate-500">@yadhu_cu</p>
      </div>
      <div className="p-2 ml-auto rounded-full hover:bg-slate-900 transition cursor-pointer">
        <BsThreeDots />
      </div>
    </div>
  );
}

function ProfileNavbar() {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, [userId]);

  const getUser = async () => {
    const reqHeader = reqHeaderHelper("application/json");
    const result = await getUserAPI(userId, reqHeader);
    if (result.status === 200) {
      setUser(result.data);
    } else {
      console.error("Error", result.response.data);
    }
  };

  return (
    <div className="w-full px-5 py-2 flex items-start border-b-2 border-slate-900">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-slate-100">{user?.name}</h3>
        <p className="text-md text-slate-500">{user?.post} posts</p>
      </div>
    </div>
  );
}

function ProfileDetailNavbar() {
  const activeDivRef = useRef(null);
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUsersPostsReducer(userId));
  }, [userId]);

  // implement the userposts when clicking the navbar.

  // handling the change effect when clicking the options
  useEffect(() => {
    const listItems = activeDivRef.current
      ? activeDivRef.current.childNodes
      : null;

    if (listItems?.length > 0) {
      listItems[0].firstChild.classList.add("active");
    }

    const handleClick = (event) => {
      listItems.forEach((item) => {
        item.firstChild.classList.remove("active");
      });

      if (event.target.localName == "li") {
        event.target.classList.add("active");
      } else {
        event.target.firstChild.classList.add("active");
      }
    };

    listItems?.length > 0 &&
      listItems.forEach((item) => {
        item.addEventListener("click", handleClick);
      });

    return () => {
      listItems?.length > 0 &&
        listItems.forEach((item) => {
          item.removeEventListener("click", handleClick);
        });
    };
  }, []);
  return (
    <div
      ref={activeDivRef}
      className="w-full h-[50px] flex items-center border-b border-slate-900"
    >
      <ul
        onClick={() => dispatch(getUsersPostsReducer(userId))}
        className="h-full w-full flex justify-center items-center font-semibold text-slate-300 transition  hover:bg-slate-900  cursor-pointer"
      >
        <li className="h-full relative flex items-center">Posts</li>
      </ul>
      <ul
        onClick={() => dispatch(getUsersRepliedPostsReducer(userId))}
        className="h-full w-full flex justify-center items-center font-semibold text-slate-300 transition hover:bg-slate-900  cursor-pointer"
      >
        <li className="h-full relative flex items-center">Replies</li>
      </ul>
      <ul
        onClick={() => dispatch(getUsersLikedPostsReducer(userId))}
        className="h-full w-full flex justify-center items-center font-semibold text-slate-300 transition hover:bg-slate-900  cursor-pointer"
      >
        <li className="h-full relative flex items-center">Likes</li>
      </ul>
    </div>
  );
}

function MessageNavbar({ buttonClick }) {
  return (
    <div className="w-full px-5 py-2 flex items-start ">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-slate-100">Message</h3>
      </div>
      <div
        onClick={buttonClick}
        className="p-2 ml-auto rounded-full hover:bg-slate-900 transition cursor-pointer"
      >
        <RiMailAddLine />
      </div>
    </div>
  );
}

function ChatNavbar() {
  const { currentChatUser } = useSelector((state) => state.messageSlice);
  const [currentChatProfile, setCurrentChatProfile] = useState({});

  useEffect(() => {
    getChatUserProfile();
  }, [currentChatUser]);

  const getChatUserProfile = async () => {
    if (currentChatUser) {
      const reqHeader = reqHeaderHelper("application/json");

      const result = await getUserAPI(currentChatUser, reqHeader);

      if (result.status === 200) {
        setCurrentChatProfile(result.data);
      } else {
        console.error("Error", result.response.data);
      }
    }
  };

  return (
    <div className="w-full p-2 flex items-center">
      <div className="flex gap-2 items-center">
        <div className="p-2 lg:hidden ml-auto rounded-full hover:bg-slate-900 transition cursor-pointer">
          <IoArrowBack />
        </div>
        <Avatar
          name={currentChatProfile?.name}
          src={
            (currentChatProfile?.profilePicture &&
              `${SERVER_URL}/user-image/${currentChatProfile?.profilePicture}`) ||
            currentChatProfile?.googlePicture
          }
        />
        <Link to={`/profile/${currentChatProfile?._id}`}>
          <h3 className="text-xl cursor-pointer font-bold text-slate-100">
            {currentChatProfile?.name}
          </h3>
        </Link>
      </div>
      <div className="p-2 ml-auto rounded-full hover:bg-slate-900 transition cursor-pointer">
        <BsThreeDots />
      </div>
    </div>
  );
}

function PostNavbar() {
  return (
    <div className="w-full px-5 py-2 flex items-start ">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-slate-100">Post</h3>
      </div>
      <div className="p-2 ml-auto rounded-full hover:bg-slate-900 transition cursor-pointer">
        <RiMailAddLine />
      </div>
    </div>
  );
}
