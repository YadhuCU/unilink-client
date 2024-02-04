import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";
import { Navbar } from "../components/Navbar";
import { CiSearch } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useRef } from "react";
import { Button } from "../components/utils/Button";
import { Chat } from "../components/Chat";

Message.propTypes = {};
ChatPeople.propTypes = {
  onClick: PropTypes.func,
};

export function Message() {
  const [search, setSearch] = useState("");
  const parentOfChatPeople = useRef(null);
  const [showChat, setShowChat] = useState(false);

  const handlActive = (e) => {
    const childNodes = parentOfChatPeople.current.childNodes;
    childNodes.forEach((item) => item.classList.remove("chat-active"));
    e.target.closest(".chat-people").classList.add("chat-active");

    setShowChat(true);
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
            <Navbar insideMessage />
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
            {new Array(24).fill(4).map((_, id) => (
              <ChatPeople onClick={handlActive} key={id} />
            ))}
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
                <Button>New Message</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function ChatPeople({ onClick }) {
  return (
    <div className="chat-people flex px-2 py-4  items-center} hover:bg-slate-900">
      <div onClick={onClick} className="flex gap-3 flex-grow">
        <img
          className="w-[50px] h-[50px] object-cover rounded-full"
          src="https://source.unsplash.com/random"
        />
        <div className="flex flex-col gap-1">
          <p className="text-md font-semibold  ">
            Yadhu{" "}
            <span className="text-sm font-light text-slate-500 ">@yadhu</span>
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
