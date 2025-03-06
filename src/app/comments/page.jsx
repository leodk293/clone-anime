"use client";
import React from "react";
import { useState, useEffect } from "react";
import CommentBox from "../components/CommentBox";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Comments() {
  const { status, data: session } = useSession();
  return (
    <div className=" mt-[60px] flex flex-col items-center max-w-[70rem] mx-auto">
      {status === "authenticated" ? (
        session && (
          <h1 className=" font-bold text-xl md:text-2xl">
            Welcome to{" "}
            <Link className=" underline " href={"/"}>
              <span className=" font-extrabold text-blue-800">clone</span>anime
            </Link>{" "}
            {session.user.name}, leave us a comment{" "}
          </h1>
        )
      ) : (
        <h1 className=" font-bold text-xl md:text-2xl">
          Signin to leave us a comment
        </h1>
      )}
      <form className=" mt-5 w-full flex flex-col gap-5">
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

      <div className=" w-full self-start mt-10 flex flex-col gap-10">
        <p className="text-xl self-start font-semibold ">
          No comments yet, be the first.
        </p>
        <CommentBox
          username={"Mark"}
          title={"Bleach"}
          comment={"bleach is so fucking underrated anime"}
        />
      </div>
    </div>
  );
}
