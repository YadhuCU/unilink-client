import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/utils/Button";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { Post } from "../components/Post";
import { dummyPost } from "../service/dummy";
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
import { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";

Profile.propTypes = {};

export function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({
    name: "Yadhukrishna",
    place: "Thrissur",
    profilePhoto: "",
    coverPhoto: "",
    dateOfBirth: "",
  });
  const [preview, setPreview] = useState({
    profile: "",
    cover: "",
  });

  useEffect(() => {
    if (
      user.profilePhoto.type == "image/png" ||
      user.profilePhoto.type == "image/jpg" ||
      user.profilePhoto.type == "image/jpeg"
    ) {
      setPreview({
        ...preview,
        profile: URL.createObjectURL(user.profilePhoto),
      });
      console.log("preview profile", preview);
      console.log("url", URL.createObjectURL(user.profilePhoto));
      console.log("user.profile", user.profilePhoto);
    } else {
      setUser({ ...user, profilePhoto: "" });
    }
    if (
      user.coverPhoto.type == "image/png" ||
      user.coverPhoto.type == "image/jpg" ||
      user.coverPhoto.type == "image/jpeg"
    ) {
      setPreview({ ...preview, cover: URL.createObjectURL(user.coverPhoto) });
    } else {
      setUser({ ...user, coverPhoto: "" });
    }
  }, [user.profilePhoto, user.coverPhoto]);

  console.log("preview", preview);

  const handleEditProfile = () => {
    onOpen();
    console.log("inside handleEditProfile");
  };

  const handleCancelEditProfile = () => {
    console.log("inside handleEditProfile");
    onClose();
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "cover") {
      setUser({ ...user, coverPhoto: file });
    } else {
      setUser({ ...user, profilePhoto: file });
    }
  };

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
              <Button buttonClick={onOpen} classes={`py-[8px] ml-auto`}>
                Edit Profile
              </Button>
            </div>
            <div className="p-4">
              <div className="py-2">
                <p className="text-xl font-bold ">Yadhukrishna CU</p>
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
        {dummyPost.map((item, index) => (
          <Post post={item} key={index} />
        ))}
      </div>
      <RightSidebar />

      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="profile grid">
              <label className="cover-photo relative">
                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer p-3 hover:bg-slate-900 bg-slate-800 rounded-full ">
                  <FaCamera />
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "cover")}
                />
                <img
                  className="object-cover w-full h-[250px]"
                  src={
                    preview.cover
                      ? preview.cover
                      : `https://source.unsplash.com/random`
                  }
                />
              </label>
              <div className="profile-details">
                <div className="flex w-full p-4 relative">
                  <label className="absolute left-4 bottom-0">
                    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer p-3 hover:bg-slate-900 bg-slate-800 rounded-full ">
                      <FaCamera />
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, "profile")}
                    />
                    <img
                      className="object-cover w-[150px] h-[150px] rounded-full"
                      src={
                        preview.profile
                          ? preview.profile
                          : `https://source.unsplash.com/random`
                      }
                    />
                  </label>
                </div>
                <div className="p-4">
                  <label className="py-2">
                    <input
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      placeholder="Name"
                      type="text"
                      className="border-none outline-none  py-2 bg-transparent text-xl font-bold"
                    />
                  </label>
                  <div className="flex gap-3 flex-wrap py-2">
                    <label className="flex gap-1 items-center  text-slate-500 basis-full">
                      <input
                        type="date"
                        className="bg-transparent outline-none"
                        onChange={(e) => console.log(new Date(e.timeStamp))}
                      />
                    </label>
                    <div className="flex gap-1 items-center  text-slate-500">
                      <input
                        type="text"
                        value={user.place}
                        onChange={(e) =>
                          setUser({ ...user, place: e.target.value })
                        }
                        className="border-none outline-none py-2 bg-transparent text-sm font-normal"
                        placeholder="Place"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              buttonClick={handleCancelEditProfile}
              classes={"mr-4 bg-slate-400"}
            >
              Cancel
            </Button>
            <Button buttonClick={handleEditProfile}>Edit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
