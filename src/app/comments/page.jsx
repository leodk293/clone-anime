import React from "react";

export default function Comments() {
  return (
    <div className=" flex flex-col items-center">
      <form className=" w-auto flex flex-col gap-5 md:w-[70%]" action="">
        <input
          className=" text-xl shadow font-bold p-2 outline-none rounded-[5px] bg-[#f1f1f1]"
          placeholder="Enter the title"
          type="text"
        />
        <textarea
          className=" text-xl font-semibold shadow p-2 outline-none rounded-[5px] bg-[#f1f1f1]"
          placeholder="Write your post ..."
          name=""
          id=""
        ></textarea>
        <button className="text-white shadow text-xl font-semibold px-4 py-2 rounded-[5px] w-[200px] border border-transparent bg-blue-700">
          Submit
        </button>
      </form>

      <div className=" mt-10 flex flex-col gap-10 md:w-[70%]">
        <p className="text-xl font-semibold ">No comments yet, be the first.</p>
      </div>
    </div>
  );
}
