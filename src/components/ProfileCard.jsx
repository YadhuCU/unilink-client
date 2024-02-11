import PropTypes from "prop-types";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { useState, useEffect } from "react";
import { dateFormatter } from "../utils/dateFormatter";
import { Avatar } from "@chakra-ui/react";
import { SERVER_URL } from "../service/serverURL";

ProfileCard.propTypes = {};

export function ProfileCard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserFromSession();
  }, []);

  const getUserFromSession = async () => {
    const user = await JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center rounded-3xl p-10 bg-slate-900">
      {/* <img */}
      {/*   className="w-[100px] h-[100px] rounded-full object-cover" */}
      {/*   src="https://source.unsplash.com/random" */}
      {/* /> */}
      <Avatar
        size={"2xl"}
        name={user?.name}
        src={
          (user?.profilePicture &&
            `${SERVER_URL}/user-image/${user?.profilePicture}`) ||
          user?.googlePicture
        }
      />
      <div className="text-center py-2">
        <p className="text-lg font-semibold ">{user?.name}</p>
        <p className="text-lg font-light text-slate-500 leading-3">
          @{user?.username}
        </p>
      </div>
      <div className="flex gap-3 flex-wrap">
        <div className="flex gap-1 items-center  text-slate-500">
          <FaBirthdayCake />
          <span className="text-sm font-normal">
            Birthday {user?.dateOfBirth && dateFormatter(user?.dateOfBirth)}
          </span>
        </div>
        <div className="flex gap-1 items-center  text-slate-500">
          <MdPlace className="text-lg" />
          <span className="text-sm font-normal">{user?.place}</span>
        </div>
        <div className="flex gap-1 items-center  text-slate-500">
          <BsCalendar2DateFill />
          <span className="text-sm font-normal">Joined {user?.joinedDate}</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-3">
        <div className="flex flex-col justify-center text-center border-r-2 border-slate-800">
          <p className="text-xl   font-bold text-slate-100">
            {user?.followers?.length}
          </p>
          <p className="text-sm   font-bold text-slate-300">followers</p>
        </div>
        <div className="flex flex-col justify-center text-center border-r-2 border-slate-800">
          <p className="text-xl   font-bold text-slate-100">
            {user?.following?.length}
          </p>
          <p className="text-sm   font-bold text-slate-300">following</p>
        </div>
        <div className="flex flex-col text-center justify-center ">
          <p className="text-xl  font-bold text-slate-100">23</p>
          <p className="text-sm  font-bold text-slate-300">posts</p>
        </div>
      </div>
    </div>
  );
}
