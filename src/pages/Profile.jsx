import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/utils/Button";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { Post } from "../components/Post";

Profile.propTypes = {};

export function Profile() {
  return (
    <>
      <LeftSidebar />
      <div className="home border-x border-slate-900 overflow-y-scroll">
        <div className="sticky top-0 z-50 backdrop-blur-md">
          <Navbar insideProfile />
        </div>
        <div className="profile grid">
          <div className="cover-photo">
            <img
              className="object-cover w-full h-[250px]"
              src="https://source.unsplash.com/random"
            />
          </div>
          <div className="profile-details">
            <div className="flex w-full p-4 relative">
              <div className="absolute left-4 bottom-0">
                <img
                  className="object-cover w-[150px] h-[150px] rounded-full"
                  src="https://source.unsplash.com/random"
                />
              </div>
              <Button classes={`py-[5px] ml-auto`}>Edit Profile</Button>
            </div>
            <div className="p-4">
              <div className="py-2">
                <p className="text-xl font-bold ">Yadhukrishnc</p>
                <p className="text-sm font-light text-slate-500 ">@yadhu</p>
              </div>
              <div className="flex gap-3 flex-wrap py-2">
                <div className="flex gap-1 items-center  text-slate-500 basis-full">
                  <FaBirthdayCake />
                  <span className="text-sm font-normal">
                    Birthday 31 Feb 2023
                  </span>
                </div>
                <div className="flex gap-1 items-center  text-slate-500">
                  <MdPlace className="text-lg" />
                  <span className="text-sm font-normal">Thrissur</span>
                </div>
                <div className="flex gap-1 items-center  text-slate-500">
                  <BsCalendar2DateFill />
                  <span className="text-sm font-normal">Joined Jan 2023</span>
                </div>
              </div>
              <div className="w-full py-2 flex gap-3">
                <div className="flex gap-2 items-center">
                  <p className="text-sm   font-bold text-slate-100">239K</p>
                  <p className="text-sm   font-normal text-slate-500">
                    followers
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-sm   font-bold text-slate-100">239K</p>
                  <p className="text-sm   font-normal text-slate-500">
                    following
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Navbar insideProfileDetail />
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
