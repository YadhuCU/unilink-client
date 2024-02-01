import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { MdBookmark } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import { BiSolidComment } from "react-icons/bi";

Post.propTypes = {
  post: PropTypes.object,
};

export function Post({ post }) {
  console.log("Post", post);
  return (
    <div className="flex gap-4 items-start p-4 border-b-2 border-slate-900">
      <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0">
        <img
          width={50}
          height={50}
          className="object-cover "
          src="https://source.unsplash.com/random"
        />
      </div>
      <div className="flex flex-col flex-grow flex-shrink gap-4">
        <div className="flex gap-1 ">
          <p className="text-md font-semibold">Yadhukrishna CU</p>
          <p className="text-md font-normal text-slate-500">@yadhukrishna_cu</p>
          <div className="p-2 ml-auto rounded-full hover:bg-slate-900 transition cursor-pointer">
            <BsThreeDots />
          </div>
        </div>
        <div className="flex flex-col gap-4">
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
          <div className=" cursor-pointer flex items-center gap-2">
            <BiSolidComment className="text-lg" />
            <p className="text-xs text-slate-600">23</p>
          </div>
          <div className=" cursor-pointer flex items-center gap-2">
            <MdBookmark className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
