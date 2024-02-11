import PropTypes from "prop-types";
import { Button } from "./utils/Button";
import { useState, useEffect } from "react";
import { getRandomUserAPI } from "../service/allAPI";
import { Avatar } from "@chakra-ui/react";
import { SERVER_URL } from "../service/serverURL";

AddPeopleCard.propTypes = {};

export function AddPeopleCard() {
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
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

  return (
    <div className="w-full p-4 flex flex-col rounded-3xl bg-slate-900">
      <h3 className=" text-xl font-bold mb-3">Add</h3>
      <div className="flex flex-col gap-3 mb-4">
        {randomUsers.length > 0 &&
          randomUsers.map((user, index) => (
            <div key={index} className="flex gap-3 items-center">
              {/* <img */}
              {/*   className="w-[50px] h-[50px] object-cover rounded-full" */}
              {/*   src="https://source.unsplash.com/random" */}
              {/* /> */}
              <Avatar
                name={user?.name}
                src={
                  (user?.profilePicture &&
                    `${SERVER_URL}/user-image/${user?.profilePicture}`) ||
                  user?.googlePicture
                }
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold leading-5 ">{user?.name}</p>
                <p className="text-sm text-slate-500 leading-5">
                  @{user?.username}
                </p>
              </div>
              <Button classes={`py-[5px] ml-auto`}>follow</Button>
            </div>
          ))}
      </div>
      {/* <div className="border-t-2 border-slate-800 cursor-pointer">view all</div> */}
    </div>
  );
}
