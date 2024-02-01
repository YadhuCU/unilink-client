import PropTypes from "prop-types";
import { FaHome } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { HiBookmark } from "react-icons/hi2";
import { AiFillMessage } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Button } from "./utils/Button";
import { BsThreeDots } from "react-icons/bs";

import { useRef, useEffect } from "react";

LeftSidebar.propTypes = {};

export function LeftSidebar() {
  const ulRef = useRef(null);

  // handling the active state effect of the button when clicking
  useEffect(() => {
    const listItems = ulRef.current.childNodes;

    const handlClick = (event) => {
      listItems.forEach((item) => {
        item.classList.remove("bg-slate-900");
      });

      if (event.target.localName === "li") {
        event.target.classList.add("bg-slate-900");
      } else {
        "current", event.target.parentNode.classList.add("bg-slate-900");
      }
    };

    listItems.forEach((item) => {
      item.addEventListener("click", handlClick);
    });

    return () => {
      listItems.forEach((item) => {
        item.removeEventListener("click", handlClick);
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-10 p-4 pl-0">
      <h1 className="text-5xl font-bold px-5 cursor-pointer">UL</h1>
      <ul ref={ulRef} className="flex flex-col gap-5 items-start">
        <li className="flex gap-4 items-center px-5 py-3 rounded-full hover:bg-slate-900 transition cursor-pointer">
          <FaHome className="text-3xl" />
          <div className="text-2xl hidden md:block">Home</div>
        </li>
        <li className="flex gap-4 items-center px-5 py-3 rounded-full hover:bg-slate-900 transition cursor-pointer">
          <IoMdNotifications className="text-3xl" />
          <div className="text-2xl hidden md:block">Notification</div>
        </li>
        <li className="flex gap-4 items-center px-5 py-3 rounded-full hover:bg-slate-900 transition cursor-pointer">
          <HiBookmark className="text-3xl" />
          <div className="text-2xl hidden md:block">Bookmark</div>
        </li>
        <li className="flex gap-4 items-center px-5 py-3 rounded-full hover:bg-slate-900 transition cursor-pointer">
          <AiFillMessage className="text-3xl" />
          <div className="text-2xl hidden md:block">Message</div>
        </li>
        <li className="flex gap-4 items-center px-5 py-3 rounded-full hover:bg-slate-900 transition cursor-pointer">
          <FaUser className="text-3xl" />
          <div className="text-2xl hidden md:block">Profile</div>
        </li>
      </ul>
      <div className="flex flex-col gap-5 mt-auto px-5">
        <Button classes="py-3">Create Post</Button>
        <div className="flex gap-3 items-center">
          <img
            className="w-[50px] h-[50px] object-cover rounded-full"
            src="https://source.unsplash.com/random"
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold leading-5 ">Yadhudkrishna</p>
            <p className="text-sm text-slate-500 leading-5">@yadhu</p>
          </div>
          <div className="p-2 ml-auto rounded-full hover:bg-slate-900 transition cursor-pointer">
            <BsThreeDots />
          </div>
        </div>
      </div>
    </div>
  );
}
