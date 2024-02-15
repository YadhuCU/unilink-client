import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/utils/Button";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { Post } from "../components/Post";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { SERVER_URL } from "../service/serverURL";
import { useToast } from "@chakra-ui/react";
import {
  getUserAPI,
  updateProfileAPI,
  getUserPostsAPI,
} from "../service/allAPI";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUserReducer } from "../redux/userProfileSlice";
import { dateFormatter } from "../utils/dateFormatter";
import { useParams } from "react-router-dom";
import { reqHeaderHelper } from "../utils/reqHeaderHelper";
import { getUsersPostsReducer } from "../redux/allPostsSlice";

Profile.propTypes = {};

export function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState({
    profile: "",
    cover: "",
  });
  const toast = useToast();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userProfileSlice);
  const { userId } = useParams();
  const { allPosts, loading } = useSelector((state) => state.allPostsSlice);

  // useEffect(() => {
  //   dispatch(getUsersPostsReducer(userId));
  // }, []);

  useEffect(() => {
    getCurrentUser();
  }, [userId]);

  const getCurrentUser = async () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await getUserAPI(userId, reqHeader);

      if (result.status === 200) {
        setUser(result.data);
      } else {
        console.log("Error", result.response.data);
      }
    }
  };

  useEffect(() => {
    if (
      user?.profilePicture?.type == "image/png" ||
      user?.profilePicture?.type == "image/jpg" ||
      user?.profilePicture?.type == "image/jpeg"
    ) {
      setPreview({
        ...preview,
        profile: URL.createObjectURL(user.profilePicture),
      });
    } else {
      setUser({ ...user, profilePicture: "" });
    }
    if (
      user?.coverPicture?.type == "image/png" ||
      user?.coverPicture?.type == "image/jpg" ||
      user?.coverPicture?.type == "image/jpeg"
    ) {
      setPreview({ ...preview, cover: URL.createObjectURL(user.coverPicture) });
    } else {
      setUser({ ...user, coverPhoto: "" });
    }
  }, [user?.profilePicture, user?.coverPicture]);

  const handleUpdateProfile = async () => {
    if (!user?.name) {
      return toast({
        title: "Warning",
        description: "name field is mandatory.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }

    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type":
          preview.profile || preview.cover
            ? "multipart/form-data"
            : "application/json",
        Authorization: `Bearer ${token}`,
      };
      const reqBody = { ...user, _id: undefined };

      const result = await updateProfileAPI(user?._id, reqHeader, reqBody);

      if (result.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(result.data));
        setUser(result.data);
        dispatch(updateCurrentUserReducer(result.data));
        onClose();
      } else {
        console.log("Error upload", result.response.data);
      }
    }
  };

  const handleCancelEditProfile = () => {
    console.log("inside handleEditProfile");
    onClose();
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "cover") {
      setUser({ ...user, coverPicture: file });
    } else {
      setUser({ ...user, profilePicture: file });
    }
  };

  const getUserPosts = async () => {
    const reqHeader = reqHeaderHelper();

    if (reqHeader) {
      const result = await getUserPostsAPI(userId, reqHeader);

      if (result.status === 200) {
      }
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
          <div className="cover-photo w-full h-[250px] bg-slate-800">
            {user?.coverPicture && (
              <img
                className="object-cover w-full h-[250px]"
                src={`${SERVER_URL}/user-image/${user?.coverPicture}`}
              />
            )}
          </div>
          <div className="profile-details">
            <div className="flex w-full p-4 relative">
              <div className="absolute left-4 bottom-0">
                <Avatar
                  size="2xl"
                  name={user?.name}
                  src={
                    user?.profilePicture
                      ? `${SERVER_URL}/user-image/${user?.profilePicture}`
                      : user?.googlePicture
                  }
                />
              </div>
              <Button
                buttonClick={onOpen}
                classes={`${
                  currentUser?._id === userId ? "z-1 " : "z-[-1] "
                } py-[8px] ml-auto`}
              >
                Edit Profile
              </Button>
            </div>
            <div className="p-4">
              <div className="py-2">
                <p className="text-xl font-bold ">{user?.name}</p>
                <p className="text-sm font-light text-slate-500 ">
                  @{user?.username}
                </p>
              </div>
              <div className="flex gap-3 flex-wrap py-2">
                <div className="flex gap-1 items-center  text-slate-500 basis-full">
                  <FaBirthdayCake />
                  <span className="text-sm font-normal">
                    {`Birthday ${
                      user?.dateOfBirth
                        ? dateFormatter(user?.dateOfBirth)
                        : "--/--/----"
                    }`}
                  </span>
                </div>
                <div className="flex gap-1 items-center  text-slate-500">
                  <MdPlace className="text-lg" />
                  <span className="text-sm font-normal">{user?.place}</span>
                </div>
                <div className="flex gap-1 items-center  text-slate-500">
                  <BsCalendar2DateFill />
                  <span className="text-sm font-normal">
                    Joined {user?.joinedDate}
                  </span>
                </div>
              </div>
              <div className="w-full py-2 flex gap-3">
                <div className="flex gap-2 items-center">
                  <p className="text-sm   font-bold text-slate-100">
                    {user?.followers?.length}
                  </p>
                  <p className="text-sm   font-normal text-slate-500">
                    followers
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-sm   font-bold text-slate-100">
                    {user?.following?.length}
                  </p>
                  <p className="text-sm   font-normal text-slate-500">
                    following
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Navbar insideProfileDetail />
        {allPosts.length > 0 &&
          allPosts.map((item, index) => <Post post={item} key={index} />)}
      </div>
      <RightSidebar />

      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="profile grid">
              <label className="cover-photo relative h-[250px] bg-slate-700">
                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer p-3 hover:bg-slate-900 bg-slate-800 rounded-full ">
                  <FaCamera />
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "cover")}
                />
                {(user?.coverPicture || preview.cover) && (
                  <img
                    className="object-cover w-full h-[250px]"
                    src={
                      preview.cover
                        ? preview.cover
                        : `${SERVER_URL}/user-image/${user?.coverPicture}`
                    }
                  />
                )}
              </label>
              <div className="profile-details">
                <div className="flex w-full p-4 relative">
                  <label className="absolute left-4 bottom-0">
                    <div className="absolute z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer p-3 hover:bg-slate-900 bg-slate-800 rounded-full ">
                      <FaCamera />
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, "profile")}
                    />
                    <Avatar
                      size="2xl"
                      name={user?.name}
                      src={
                        preview.profile ||
                        (user?.profilePicture &&
                          `${SERVER_URL}/user-image/${user?.profilePicture}`) ||
                        user?.googlePicture
                      }
                    />
                    {/* <img */}
                    {/*   className="object-cover w-[150px] h-[150px] rounded-full" */}
                    {/*   src={ */}
                    {/*     preview.profile */}
                    {/*       ? preview.profile */}
                    {/*       : `https://source.unsplash.com/random` */}
                    {/*   } */}
                    {/* /> */}
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
                        value={user?.dateOfBirth}
                        type="date"
                        className="bg-transparent outline-none"
                        onChange={(e) =>
                          setUser({ ...user, dateOfBirth: e.target.value })
                        }
                      />
                    </label>
                    <div className="flex gap-1 items-center text-slate-500">
                      <MdPlace className="text-lg" />
                      <input
                        type="text"
                        value={user.place}
                        onChange={(e) =>
                          setUser({ ...user, place: e.target.value })
                        }
                        className="border-none outline-none py-2 bg-transparent text-sm font-normal"
                        placeholder="Place..."
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
            <Button buttonClick={handleUpdateProfile}>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
