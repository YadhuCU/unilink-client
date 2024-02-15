import PropTypes from "prop-types";
import { Navbar } from "./Navbar";
import { IoSend } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessageReducer } from "../redux/messageSlice";
import { sendMessageAPI } from "../service/allAPI";
import { reqHeaderHelper } from "../utils/reqHeaderHelper";

Chat.propTypes = {};

export function Chat() {
  const [message, setMessage] = useState("");
  const { currentChatUser, currentChat } = useSelector(
    (state) => state.messageSlice,
  );
  const { currentUser } = useSelector((state) => state.userProfileSlice);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);

  useEffect(() => {
    if (lastMessageRef?.current) {
      lastMessageRef.current.scrollIntoView({ smooth: true });
    }
  }, [currentChat]);

  useEffect(() => {
    getMessages();
  }, [currentChatUser]);

  const getMessages = async () => {
    if (currentChatUser) {
      dispatch(getMessageReducer(currentChatUser));
    }
  };

  const addMessage = async () => {
    if (!message) return;

    const reqHeader = reqHeaderHelper("application/json");
    const reqBody = {
      receiverId: currentChatUser,
      message: message,
    };
    const result = await sendMessageAPI(reqHeader, reqBody);
    if (result.status === 201) {
      setMessage("");
      getMessages();
    }
  };

  return (
    <div
      className={`max-h-screen flex flex-col border-r-2 px-2 border-slate-900 sticky left-0 top-0 `}
    >
      {/* chat message */}
      <div className="flex flex-col h-full overflow-y-scroll pb-2">
        <div className="sticky top-0 z-50 backdrop-blur-md">
          <Navbar insideChat />
        </div>
        <div className="w-full flex flex-col items-center gap-2 px-2 py-8 my-4 hover:bg-slate-900 transition-colors">
          <img
            className="object-cover w-[150px] h-[150px] rounded-full"
            src="https://source.unsplash.com/random"
          />
          <h5 className="text-2xl font-bold ">Yadhu</h5>
          <h4 className="text-xl font-light leading-3">@yadhu</h4>
        </div>
        {currentChat?.length > 0 &&
          currentChat?.map((chat, index) => {
            if (chat?.sender === user._id) {
              return <Me reference={lastMessageRef} chat={chat} key={index} />;
            } else {
              return <You reference={lastMessageRef} chat={chat} key={index} />;
            }
          })}
      </div>
      {/* message input  */}
      <div className="w-full p-2 flex bg-slate-950">
        <label className="flex w-full px-4 py-2 gap-2 bg-slate-900 rounded-full items-center transition-all">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addMessage()}
            type="text"
            placeholder="Type Message.."
            className="bg-transparent border-0 outline-none w-full"
          />
          <IoSend onClick={addMessage} className="text-2xl" />
        </label>
      </div>
    </div>
  );
}

function Me({ chat, reference }) {
  return (
    <div
      ref={reference}
      className="bg-slate-300 text-slate-800 rounded-bl-full ml-auto mr-2  w-max flex gap-2 items-end my-1 py-2 px-4  rounded-tr-full rounded-tl-full "
    >
      {chat?.message}
      <span className="text-xs translate-x-1 translate-y-1">
        {chat?.createdAt}
      </span>
    </div>
  );
}

function You({ chat, reference }) {
  return (
    <div
      ref={reference}
      className="bg-slate-800 text-slate-300 rounded-br-full w-max flex gap-2 items-end my-1 py-2 px-4  rounded-tr-full rounded-tl-full "
    >
      {chat?.message}
      <span className="text-xs translate-x-1 translate-y-1">
        {chat?.createdAt}
      </span>
    </div>
  );
}
