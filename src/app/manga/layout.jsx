import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Manga - Clone-Anime",
};

export default function layout({ children }) {
  return (
    <div className=" flex flex-col items-center gap-5">
      <nav className=" border border-white px-4 py-2 rounded-[50px] bg-black text-white flex flex-row gap-4 font-semibold text-[14px] md:text-[19px] ">
        <Link className="px-3 py-1 rounded-[50px] hover:bg-white duration-300 hover:text-black " href={"/manga"}>manga-list</Link>
        <Link className="px-3 py-1 rounded-[50px] hover:bg-white duration-300 hover:text-black " href={"/manga/popular-manga"}>popular-manga</Link>
        <Link className="px-3 py-1 rounded-[50px] hover:bg-white duration-300 hover:text-black " href={"/manga/top-manga"}>top-manga</Link>
      </nav>

      {children}
    </div>
  );
}
