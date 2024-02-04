import PropTypes from "prop-types";
import { Navbar } from "./Navbar";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

Chat.propTypes = {};

export function Chat() {
  const [message, setMessage] = useState("");
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
        <Me />
        <Me />
        <Me />
        <You />
        <Me />
        <Me />
        <You />
        <Me />
        <Me />
        <You />
        <Me />
        <Me />
        <You />
        <Me />
        <Me />
        <You />
        <Me />
      </div>
      {/* message input  */}
      <div className="w-full p-2 flex bg-slate-950">
        <label className="flex w-full px-4 py-2 gap-2 bg-slate-900 rounded-full items-center transition-all">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type Message.."
            className="bg-transparent border-0 outline-none w-full"
          />
          <IoSend className="text-2xl" />
        </label>
      </div>
    </div>
  );
}

function Me() {
  return (
    <div className="bg-slate-300 text-slate-800 rounded-bl-full ml-auto mr-2  w-max flex gap-2 items-end my-1 py-2 px-4  rounded-tr-full rounded-tl-full ">
      hi
      <span className="text-xs translate-x-1 translate-y-1">5:20pm</span>
    </div>
  );
}

function You() {
  return (
    <div className="bg-slate-800 text-slate-300 rounded-br-full w-max flex gap-2 items-end my-1 py-2 px-4  rounded-tr-full rounded-tl-full ">
      Hi
      <span className="text-xs translate-x-1 translate-y-1">5:20pm</span>
    </div>
  );
}
