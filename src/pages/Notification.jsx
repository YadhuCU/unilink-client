import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/utils/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

Notification.propTypes = {};

export function Notification() {
  const navigate = useNavigate();

  return (
    <>
      <LeftSidebar />
      <div className="home border-x border-slate-900 overflow-y-scroll">
        <div className="sticky top-0 z-50 backdrop-blur-md">
          <Navbar insideNotification />
        </div>
        <div className="w-full p-5">
          <PostNotification />
          <PostNotification />
          <FollowNotification />
          <PostNotification />
          <FollowNotification />
          <PostNotification />
          <FollowNotification />
          <PostNotification />
          <FollowNotification />
          <PostNotification />
          <FollowNotification />
          <PostNotification />
          <FollowNotification />
          <PostNotification />
          <FollowNotification />
          <PostNotification />
          <FollowNotification />
          <PostNotification />
          <FollowNotification />
          <PostNotification />
          <FollowNotification />
          <FollowNotification />
        </div>
      </div>
      <RightSidebar />
    </>
  );
}

function PostNotification() {
  return (
    <div className="w-full py-4 flex gap-5 items-center border-b-2 border-slate-900">
      <img
        className="object-cover w-[50px] h-[50px] rounded-full"
        src="https://source.unsplash.com/random"
      />
      <div className="flex gap-2">
        <p className="text-sm font-semibold leading-5 ">
          @yadhu{" "}
          <span className="text-sm font-light text-slate-500 leading-5">
            added new post
          </span>
        </p>
      </div>
    </div>
  );
}

function FollowNotification() {
  return (
    <div className="w-full py-4 flex gap-5 items-center border-b-2 border-slate-900">
      <img
        className="object-cover w-[50px] h-[50px] rounded-full"
        src="https://source.unsplash.com/random"
      />
      <div className="flex gap-2">
        <p className="text-sm font-semibold leading-5 ">
          @yadhu{" "}
          <span className="text-sm font-light text-slate-500 leading-5">
            Started to follow you
          </span>
        </p>
      </div>
      <Button classes={`ml-auto py-[5px]`}>follow</Button>
    </div>
  );
}
