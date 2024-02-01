import PropTypes from "prop-types";
import { Button } from "./utils/Button";

AddPeopleCard.propTypes = {};

export function AddPeopleCard() {
  return (
    <div className="w-full p-4 flex flex-col rounded-3xl bg-slate-900">
      <h3 className=" text-xl font-bold mb-3">Add</h3>
      <div className="flex flex-col gap-3 mb-4">
        {new Array(4).fill(0).map((_, index) => (
          <div key={index} className="flex gap-3 items-center">
            <img
              className="w-[50px] h-[50px] object-cover rounded-full"
              src="https://source.unsplash.com/random"
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold leading-5 ">Yadhudkrishna</p>
              <p className="text-sm text-slate-500 leading-5">@yadhu</p>
            </div>
            <Button classes={`py-[5px] ml-auto`}>follow</Button>
          </div>
        ))}
      </div>
      <div className="border-t-2 border-slate-800 cursor-pointer">view all</div>
    </div>
  );
}
