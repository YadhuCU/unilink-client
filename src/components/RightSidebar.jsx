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
import { useRef } from "react";
import { Button } from "./utils/Button";

export function RightSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
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
          </DrawerBody>

          <DrawerFooter>
            <Button buttonClick={onClose}>Cancel</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
