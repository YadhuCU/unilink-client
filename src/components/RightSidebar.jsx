import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci";
import { ProfileCard } from "./ProfileCard";
import { AddPeopleCard } from "./AddPeopleCard";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
RightSidebar.propTypes = {};
import { useRef, useState, useEffect } from "react";
import { Button } from "./utils/Button";
import { getAllUserAPI } from "../service/allAPI";
import { Avatar } from "@chakra-ui/react";
import { SERVER_URL } from "../service/serverURL";

export function RightSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

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
      const result = await getAllUserAPI(reqHeader);
      if (result.status === 200) {
        setRandomUsers(result.data);
      } else {
        console.log("Error", result);
      }
    }
  };
  return (
    <div className="hidden lg:flex flex-col gap-10 px-3">
      <div className="h-[50px] flex items-center py-2 ">
        <label
          onClick={onOpen}
          className="flex justify-center w-full px-4 py-3 mt-4 cursor-pointer gap-2 bg-slate-900 rounded-full items-center"
        >
          <CiSearch className="text-xl" />
          <p>Search People</p>
        </label>
      </div>
      <ProfileCard />
      <AddPeopleCard />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search People</DrawerHeader>

          <DrawerBody>
            <input
              className="outline-none border-4 border-slate-800 px-5 py-3 rounded-full w-full bg-transparent"
              type="text"
              placeholder="Search People..."
            />

            <div className="mt-5 flex flex-col gap-3 mb-4">
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
                      <p className="text-sm font-semibold leading-5 ">
                        {user?.name}
                      </p>
                      <p className="text-sm text-slate-500 leading-5">
                        @{user?.username}
                      </p>
                    </div>
                    <Button classes={`py-[5px] ml-auto`}>follow</Button>
                  </div>
                ))}
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button buttonClick={onClose}>Cancel</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
