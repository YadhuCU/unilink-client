import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RiMailAddLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";

Navbar.propTypes = {
  insideHome: PropTypes.bool,
  insideBookmark: PropTypes.bool,
  insideNotification: PropTypes.bool,
  insideProfile: PropTypes.bool,
  insideProfileDetail: PropTypes.bool,
  insideMessage: PropTypes.bool,
  insideChat: PropTypes.bool,
};

export function Navbar({
  insideHome,
  insideBookmark,
  insideNotification,
  insideProfile,
  insideProfileDetail,
  insideMessage,
  insideChat,
}) {
  return (
    <>
      {insideHome && <HomeNavbar />}
      {insideBookmark && <BookmarkNavbar />}
      {insideNotification && <NotificationNavbar />}
      {insideProfile && <ProfileNavbar />}
      {insideProfileDetail && <ProfileDetailNavbar />}
      {insideMessage && <MessageNavbar />}
      {insideChat && <ChatNavbar />}
    </>
  );
}

function HomeNavbar() {
  const activeDivRef = useRef(null);

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
      <ul className="h-full w-full flex justify-center items-center font-semibold text-slate-300 transition  hover:bg-slate-900  cursor-pointer">
        <li className="h-full relative flex items-center">For you</li>
      </ul>
      <ul className="h-full w-full flex justify-center items-center font-semibold text-slate-300 transition hover:bg-slate-900  cursor-pointer">
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
  return (
    <div className="w-full px-5 py-2 flex items-start border-b-2 border-slate-900">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-slate-100">Yadhukrisna CU</h3>
        <p className="text-md text-slate-500">4 posts</p>
      </div>
    </div>
  );
}

function ProfileDetailNavbar() {
  const activeDivRef = useRef(null);

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
      <ul className="h-full w-full flex justify-center items-center font-semibold text-slate-300 transition  hover:bg-slate-900  cursor-pointer">
        <li className="h-full relative flex items-center">Posts</li>
      </ul>
      <ul className="h-full w-full flex justify-center items-center font-semibold text-slate-300 transition hover:bg-slate-900  cursor-pointer">
        <li className="h-full relative flex items-center">Replies</li>
      </ul>
      <ul className="h-full w-full flex justify-center items-center font-semibold text-slate-300 transition hover:bg-slate-900  cursor-pointer">
        <li className="h-full relative flex items-center">Likes</li>
      </ul>
    </div>
  );
}

function MessageNavbar() {
  return (
    <div className="w-full px-5 py-2 flex items-start ">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-slate-100">Message</h3>
      </div>
      <div className="p-2 ml-auto rounded-full hover:bg-slate-900 transition cursor-pointer">
        <RiMailAddLine />
      </div>
    </div>
  );
}

function ChatNavbar() {
  return (
    <div className="w-full p-2 flex items-center">
      <div className="flex gap-2 items-center">
        <div className="p-2 lg:hidden ml-auto rounded-full hover:bg-slate-900 transition cursor-pointer">
          <IoArrowBack />
        </div>
        <img
          className="w-[50px] h-[50px] object-cover rounded-full"
          src="https://source.unsplash.com/random"
        />
        <h3 className="text-xl font-bold text-slate-100">Yadhukrishna CU</h3>
      </div>
      <div className="p-2 ml-auto rounded-full hover:bg-slate-900 transition cursor-pointer">
        <BsThreeDots />
      </div>
    </div>
  );
}
