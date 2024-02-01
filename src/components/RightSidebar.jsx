import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci";
import { ProfileCard } from "./ProfileCard";
import { AddPeopleCard } from "./AddPeopleCard";

RightSidebar.propTypes = {};

export function RightSidebar() {
  return (
    <div className="hidden lg:flex flex-col gap-10 px-3">
      <div className="h-[50px] flex items-center py-2 ">
        <label className="flex w-full px-4 py-2 gap-2 bg-slate-900 rounded-full items-center">
          <CiSearch className="text-md" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-0 outline-none w-full"
          />
        </label>
      </div>
      <ProfileCard />
      <AddPeopleCard />
    </div>
  );
}
