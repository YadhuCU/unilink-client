import PropTypes from "prop-types";
import { FaHome } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { HiBookmark } from "react-icons/hi2";
import { AiFillMessage } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Button } from "./utils/Button";
import { BsThreeDots } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

LeftSidebar.propTypes = {
  insideHome: PropTypes.bool,
};

export function LeftSidebar({ insideHome }) {
  const ulRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullWidth, setFullWidth] = useState(false);
  const currentLocation = useLocation();

  const handleOpenPost = () => {
    onOpen();
    setFullWidth(true);
  };

  const handleCancelPost = () => {
    onClose();
    setTimeout(() => {
      setFullWidth(false);
    }, 100);
  };

  // handling the active state effect of the button when clicking
  useEffect(() => {
    const activeListName = currentLocation.pathname.split("/")[1];
    const sidebar = document.getElementById("left-side-bar");
    const currList = sidebar.querySelector(`.${activeListName}`);
    if (currList) {
      currList.classList.add("bg-slate-800");
    }
  }, []);

  const textRef = useRef(null);
  const [post, setPost] = useState({
    postText: "",
    postImage: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (
      post.postImage.type == "image/png" ||
      post.postImage.type == "image/jpg" ||
      post.postImage.type == "image/jpeg"
    ) {
      setImagePreview(URL.createObjectURL(post.postImage));
    } else {
      setPost({ ...post, postImage: "" });
      setImagePreview("");
    }
  }, [post.postImage]);

  const handleKeyUp = () => {
    const textarea = textRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setPost({ ...post, postText: textarea.value });
  };

  const handleCreatPost = () => {
    console.log("Button is working");
    if (post.postImage || post.postText) {
      console.log(post);
    }
  };

  const handleClear = () => {
    const textarea = textRef.current;
    textarea.style.height = "auto";
    setPost({ postText: "", postImage: "" });
  };
  return (
    <>
      <div
        id="left-side-bar"
        className="absolute z-10 bottom-0 w-full bg-slate-950 md:static flex flex-col gap-10 px-4 md:p-4 pl-0"
      >
        <Link to="/home">
          <h1 className="hidden md:block text-5xl font-bold px-5 cursor-pointer">
            UL
          </h1>
        </Link>
        <ul
          ref={ulRef}
          className="flex md:flex-col md:gap-5 justify-around items-start"
        >
          <Link to="/home">
            <li className="home flex gap-4 items-center px-5 py-3 rounded-full hover:bg-slate-900 transition cursor-pointer">
              <FaHome className="text-3xl" />
              <div className="text-2xl hidden md:block">Home</div>
            </li>
          </Link>
          <Link to="/notification">
            <li className="notification flex gap-4 items-center px-5 py-3 rounded-full hover:bg-slate-900 transition cursor-pointer">
              <IoMdNotifications className="text-3xl" />
              <div className="text-2xl hidden md:block">Notification</div>
            </li>
          </Link>
          <Link to="/bookmark">
            <li className="bookmark flex gap-4 items-center px-5 py-3 rounded-full hover:bg-slate-900 transition cursor-pointer">
              <HiBookmark className="text-3xl" />
              <div className="text-2xl hidden md:block">Bookmark</div>
            </li>
          </Link>
          <Link to="/message">
            <li className="message flex gap-4 items-center px-5 py-3 rounded-full hover:bg-slate-900 transition cursor-pointer">
              <AiFillMessage className="text-3xl" />
              <div className="text-2xl hidden md:block">Message</div>
            </li>
          </Link>
          <Link to="/profile">
            <li className="profile flex gap-4 items-center px-5 py-3 rounded-full hover:bg-slate-900 transition cursor-pointer">
              <FaUser className="text-3xl" />
              <div className="text-2xl hidden md:block">Profile</div>
            </li>
          </Link>
        </ul>
        {insideHome && (
          <div
            onClick={handleOpenPost}
            className="absolute md:hidden bottom-20 left-5 rounded-full p-4 text-3xl text-slate-900 bg-slate-100 drop-shadow-[0px_0px_15px_rgba(225,225,225,225.25)] cursor-pointer"
          >
            <FaPencilAlt />
          </div>
        )}
        <div className="hidden md:flex flex-col gap-5 mt-auto px-5">
          <Button buttonClick={onOpen} classes="py-3">
            Create Post
          </Button>
          <div className="flex gap-3 items-center">
            <img
              className="w-[50px] h-[50px] object-cover rounded-full"
              src="https://source.unsplash.com/random"
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold leading-5 ">Yadhudkrishna</p>
              <p className="text-sm text-slate-500 leading-5">@yadhu</p>
            </div>
            <Menu>
              <MenuButton
                px={3}
                py={3}
                transition="all 0.2s"
                borderRadius="full"
                _hover={{ bg: "#1e293b" }}
              >
                <BsThreeDots />
              </MenuButton>
              <MenuList className="bg-slate-800 text-slate-300">
                <MenuItem>Logout</MenuItem>
                <MenuItem>Profile</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} size={fullWidth ? "full" : "xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Creat Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="add-post p-4 pb-0 flex items-start gap-2 border-b-2 border-slate-950">
              <img
                className="object-cover w-[50px] h-[50px] rounded-full"
                src="https://source.unsplash.com/random"
              />
              <div className="flex flex-col flex-grow ">
                <textarea
                  ref={textRef}
                  className="w-full text-lg font-semibold bg-transparent outline-none resize-none px-2 py-2 mt-px mb-2"
                  rows="1"
                  value={post.postText}
                  onChange={(e) => handleKeyUp(e)}
                  autoCorrect="false"
                  placeholder="Post your thoughts..."
                ></textarea>
                {imagePreview && (
                  <div className="py-2 relative">
                    <div
                      onClick={() => setPost({ ...post, postImage: "" })}
                      className="absolute left-0 p-3 rounded-full cursor-pointer bg-slate-900 hover:bg-slate-800 transition"
                    >
                      <FaTrash className="text-lg" />
                    </div>
                    <img src={imagePreview} width={300} />
                  </div>
                )}
                <div className="flex gap-4 w-full border-t-2 border-slate-950 py-3">
                  <label className="p-3 rounded-full hover:bg-slate-950 transition cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        setPost({ ...post, postImage: e.target.files[0] })
                      }
                    />
                    <LuImagePlus className="text-xl" />
                  </label>
                  {(post.postText || post.postImage) && (
                    <div
                      onClick={handleClear}
                      className=" p-3 rounded-full cursor-pointer hover:bg-slate-800 transition ml-auto"
                    >
                      <FaTrash className="text-lg" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              buttonClick={handleCancelPost}
              classes={"mr-4 bg-slate-400"}
            >
              Close
            </Button>
            <Button buttonClick={handleCreatPost}>Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
