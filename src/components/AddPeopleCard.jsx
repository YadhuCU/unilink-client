import PropTypes from "prop-types";
import { Button } from "./utils/Button";
import { useState, useEffect } from "react";
import { getRandomUserAPI } from "../service/allAPI";
import { Avatar } from "@chakra-ui/react";
import { SERVER_URL } from "../service/serverURL";
import { followUnfollowUserAPI } from "../service/allAPI";
import { Link } from "react-router-dom";

AddPeopleCard.propTypes = {};

export function AddPeopleCard() {
  const [randomUsers, setRandomUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getcurrentUser();
    getRandomUsers();
  }, []);

  const getRandomUsers = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await getRandomUserAPI(reqHeader);
      if (result.status === 200) {
        setRandomUsers(result.data);
      } else {
        console.log("Error", result);
      }
    }
  };

  const getcurrentUser = async () => {
    const user = await JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
  };

  const handleFollowUnfollowUser = async (followerId) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await followUnfollowUserAPI(followerId, reqHeader);
      if (result.status === 200) {
        getRandomUsers();
      } else {
        console.log("Error", result);
      }
    }
  };

  return (
    <div className="w-full p-4 flex flex-col rounded-3xl bg-slate-900">
      <h3 className=" text-xl font-bold mb-3">Add</h3>
      <div className="flex flex-col gap-3 mb-4">
        {randomUsers.length > 0 &&
          randomUsers.map((user, index) => (
            <div key={index} className="flex gap-3 items-center">
              <Avatar
                name={user?.name}
                src={
                  (user?.profilePicture &&
                    `${SERVER_URL}/user-image/${user?.profilePicture}`) ||
                  user?.googlePicture
                }
              />
              <Link to={`/profile/${user?._id}`}>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold leading-5 ">
                    {user?.name}
                  </p>
                  <p className="text-sm text-slate-500 leading-5">
                    @{user?.username}
                  </p>
                </div>
              </Link>
              <Button
                buttonClick={() => handleFollowUnfollowUser(user?._id)}
                classes={`py-[5px] ml-auto`}
              >
                {user?.followers?.includes(currentUser?._id)
                  ? "unfollow"
                  : "follow"}
              </Button>
            </div>
          ))}
      </div>
      {/* <div className="border-t-2 border-slate-800 cursor-pointer">view all</div> */}
    </div>
  );
}
