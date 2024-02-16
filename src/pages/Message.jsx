import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";
import { Navbar } from "../components/Navbar";
import { CiSearch } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../components/utils/Button";
import { Chat } from "../components/Chat";
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
  AvatarBadge,
} from "@chakra-ui/react";
import { SERVER_URL } from "../service/serverURL";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";
import {
  getAllConversationsAPI,
  getAllUserAPI,
  sendMessageAPI,
} from "../service/allAPI";
import { reqHeaderHelper } from "../utils/reqHeaderHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrentChatUserReducer,
  getAllConversationsReducer,
  getMessageReducer,
  updateLatesteMessage,
} from "../redux/messageSlice";

Message.propTypes = {};
ChatPeople.propTypes = {
  onClick: PropTypes.func,
  user: PropTypes.object,
};
Conversation.propTypes = {
  onClick: PropTypes.func,
  conversation: PropTypes.object,
};

export function Message() {
  const [search, setSearch] = useState("");
  const parentOfChatPeople = useRef(null);
  const [showChat, setShowChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();
  const { allConversation, activeUsers } = useSelector(
    (state) => state.messageSlice,
  );
  const { socket } = useSelector((state) => state.socketSlice);

  useEffect(() => {
    socket.on("add-message", (message) => {
      dispatch(getAllConversationsReducer());
      dispatch(getMessageReducer(message?.sender));
      dispatch(updateLatesteMessage(message));
    });
    return () => {
      socket.off("add-message");
    };
  }, [socket]);

  useEffect(() => {
    getAllUsers();
  }, [search]);

  useEffect(() => {
    dispatch(getAllConversationsReducer());
  }, []);

  const getAllUsers = async () => {
    const reqHeader = reqHeaderHelper();

    if (reqHeader) {
      const result = await getAllUserAPI(search, reqHeader);
      if (result.status === 200) {
        setAllUsers(result.data);
      } else {
        console.log("Error", result);
      }
    }
  };

  const handlActiveAndAddConversation = ({ e, id }) => {
    const childNodes = parentOfChatPeople.current.childNodes;
    childNodes.forEach((item) => item.classList.remove("chat-active"));
    e.target.closest(".chat-people").classList.add("chat-active");
    setShowChat(true);
    onClose();
    dispatch(addCurrentChatUserReducer(id));
  };

  const createConversation = async (id) => {
    const reqHeader = reqHeaderHelper("application/json");
    const reqBody = {
      receiverId: id,
      message: "",
    };

    dispatch(addCurrentChatUserReducer(id));
    const result = await sendMessageAPI(reqHeader, reqBody);
    if (result.status === 201) {
      dispatch(getAllConversationsReducer());
      setShowChat(true);
      onClose();
    }
  };

  return (
    <>
      <LeftSidebar />
      <div className="home relative lg:col-span-2 grid lg:grid-cols-[1.5fr_2fr] overflow-x-hidden">
        <div
          className={`${
            showChat ? "hidden lg:block" : "block"
          } border-x-2 border-slate-900`}
        >
          <div className="sticky top-0 z-50 backdrop-blur-md">
            <Navbar insideMessage buttonClick={onOpen} />
          </div>
          <div className="h-[50px] flex gap-2 items-center p-2 realative">
            <IoArrowBack
              onClick={() => setSearch("")}
              className={`${
                search ? "opacity-1 block" : "opacity-0 absolute"
              } text-xl transition-all duration-300`}
            />
            <label className="flex w-full px-4 py-2 gap-2 bg-slate-900 rounded-full items-center transition-all">
              <CiSearch className="text-md" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search Chat"
                className="bg-transparent border-0 outline-none w-full"
              />
            </label>
          </div>

          <div ref={parentOfChatPeople} className="w-full py-4 ">
            {allConversation?.length > 0
              ? allConversation?.map((conversation, index) => {
                  if (activeUsers.includes(conversation.members[0]?._id)) {
                    conversation = { ...conversation, isOnline: true };
                  } else {
                    conversation = { ...conversation, isOnline: false };
                  }
                  return (
                    <Conversation
                      conversation={conversation}
                      onClick={handlActiveAndAddConversation}
                      key={index}
                    />
                  );
                })
              : null}
          </div>
        </div>
        {/* show chat  */}
        {showChat ? (
          <Chat />
        ) : (
          <div
            className={` home max-h-screen border-r-2 border-slate-900 sticky left-0 top-0 overflow-y-scroll`}
          >
            <div className="w-full h-screen grid place-content-center">
              <div className="max-w-xs">
                <h1 className="text-4xl font-bold text-slate-100">
                  Select Message
                </h1>
                <p className="text-slate-500 my-5">
                  Choose from your existing conversations, start a new one, or
                  just keep swimming
                </p>
                <Button buttonClick={onOpen}>New Message</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Friends.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label className="flex w-full px-4 border-3 border-slate-500 py-2 gap-2 rounded-full items-center transition-all">
              <CiSearch className="text-md" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search Chat"
                className="bg-transparent border-0 outline-none w-full"
              />
            </label>
            {allUsers?.length > 0
              ? allUsers?.map((user, index) => (
                  <ChatPeople
                    key={index}
                    user={user}
                    onClick={createConversation}
                  />
                ))
              : null}
          </ModalBody>

          <ModalFooter>
            <Button buttonClick={onClose} classes={"mr-4 bg-slate-400"}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function ChatPeople({ onClick, user }) {
  return (
    <div className="chat-people flex px-2 py-4  items-center hover:bg-slate-900">
      <div onClick={() => onClick(user?._id)} className="flex gap-3 flex-grow">
        <Avatar
          name={user?.name}
          src={
            (user?.profilePicture &&
              `${SERVER_URL}/user-image/${user?.profilePicture}`) ||
            user?.googlePicture
          }
        />
        <div className="flex flex-col gap-1">
          <p className="text-md font-semibold  ">
            {user?.name}{" "}
            <span className="text-sm font-light text-slate-500 ">
              @ {user?.username}
            </span>
          </p>
          <p className="text-sm font-light text-slate-500 leading-3 ">
            message
          </p>
        </div>
      </div>
      <div className="">
        <div className="settings p-2 opacity-0 ml-auto rounded-full hover:bg-slate-800 transition cursor-pointer">
          <BsThreeDots />
        </div>
      </div>
    </div>
  );
}

function Conversation({ onClick, conversation }) {
  return (
    <div className="chat-people flex px-2 py-4  items-center hover:bg-slate-900">
      <div
        onClick={(e) => onClick({ e, id: conversation?.members[0]?._id })}
        className="flex gap-3 flex-grow"
      >
        <Avatar
          name={conversation?.members[0]?.name}
          src={
            (conversation?.members[0]?.profilePicture &&
              `${SERVER_URL}/user-image/${conversation?.members[0]?.profilePicture}`) ||
            conversation?.members[0]?.googlePicture
          }
        >
          {conversation.isOnline && (
            <AvatarBadge boxSize="1em" borderColor="#0f172a" bg="green.500" />
          )}
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="text-md font-semibold  ">
            {conversation?.members[0].name}{" "}
            <span className="text-sm font-light text-slate-500 ">
              @ {conversation?.members[0].username}
            </span>
          </p>
          <p className="text-sm font-light text-slate-500 leading-3 ">
            {conversation?.lastMessage?.message}
          </p>
        </div>
      </div>
      <div className="">
        <div className="settings p-2 opacity-0 ml-auto rounded-full hover:bg-slate-800 transition cursor-pointer">
          <BsThreeDots />
        </div>
      </div>
    </div>
  );
}
