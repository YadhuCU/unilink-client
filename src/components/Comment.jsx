import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserAPI } from "../service/allAPI";
import { SERVER_URL } from "../service/serverURL";

Comment.propTypes = {
  comment: PropTypes.object,
};

export function Comment({ comment }) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 items-start p-4 border-b-2 border-slate-900">
      <Avatar
        name={comment?.commentAuthorName}
        src={
          (comment?.commentAuthorProfilePicture &&
            `${SERVER_URL}/user-image/${comment?.commentAuthorProfilePicture}`) ||
          comment?.commentAuthorGooglePicture
        }
      />
      <div className="flex flex-col flex-grow flex-shrink gap-4">
        <div className="flex gap-1 ">
          <p className="text-sm md:text-md font-semibold">
            {comment?.commentAuthorName}
          </p>
          <p className="text-sm md:text-md font-normal text-slate-500">
            @{comment?.commentAuthorUsername}
          </p>
          <div className=" ml-auto">
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
                <MenuItem
                  onClick={() => navigate(`/profile/${comment?.commentAuthor}`)}
                >
                  view user
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <div className="flex flex-col p-4 gap-4 border-2 rounded-xl border-slate-800">
          <span
            role="textbox"
            contentEditable="false"
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{
              __html: comment?.commentText ? comment?.commentText : "",
            }}
          />
          {/* {comment?.postImage && ( */}
          {/*   <img */}
          {/*     className="rounded-lg border-2 border-slate-900" */}
          {/*     src={`${SERVER_URL}/post-image/${comment?.postImage}`} */}
          {/*   /> */}
          {/* )} */}
        </div>

        <div className="flex justify-between py-2  text-slate-500">
          <div className=" cursor-pointer flex items-center gap-2">
            <IoHeart className="text-lg" />
            <p className="text-xs text-slate-600">23</p>
          </div>
        </div>
      </div>
    </div>
  );
}
