import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { MdBookmark } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import { BiSolidComment } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

Post.propTypes = {
  post: PropTypes.object,
  comment: PropTypes.bool,
};

export function Post({ post, comment }) {
  const naviage = useNavigate();

  const handleNavigate = () => {
    if (!comment) {
      naviage("/post");
    }
  };

  return (
    <div className="flex gap-4 items-start p-4 border-b-2 border-slate-900">
      <img
        className="object-cover w-[50px] h-[50px] rounded-full"
        src="https://source.unsplash.com/random"
      />
      <div className="flex flex-col flex-grow flex-shrink gap-4">
        <div className="flex gap-1 ">
          <p className="text-sm md:text-md font-semibold">Yadhukrishna CU</p>
          <p className="text-sm md:text-md font-normal text-slate-500">
            @yadhukrishna_cu
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
                <MenuItem>view post</MenuItem>
                <MenuItem>view user</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <div onClick={handleNavigate} className="flex flex-col gap-4">
          <span
            role="textbox"
            contentEditable="false"
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{
              __html: post?.postText ? post?.postText : "",
            }}
          />
          <img
            className="rounded-lg border-2 border-slate-900"
            src={post?.postImage ? post.postImage : ""}
          />
        </div>

        <div className="flex justify-between py-2  text-slate-500">
          <div className=" cursor-pointer flex items-center gap-2">
            <IoHeart className="text-lg" />
            <p className="text-xs text-slate-600">23</p>
          </div>
          {comment || (
            <div
              onClick={handleNavigate}
              className=" cursor-pointer flex items-center gap-2"
            >
              <BiSolidComment className="text-lg" />
              <p className="text-xs text-slate-600">23</p>
            </div>
          )}
          <div className=" cursor-pointer flex items-center gap-2">
            <MdBookmark className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
