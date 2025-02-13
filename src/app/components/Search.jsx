'use client';
import React from "react";
import { Search } from "lucide-react";

export default function SearchAnime() {
  return (
    <form className="border-2 border-black mt-10 self-start p-2 rounded-[10px] flex flex-row gap-4 items-center justify-center md:mt-[12rem]">
      <Search className="self-center" />
      <input
        className="self-center outline-none text-black text-xl font-semibold placeholder:text-black"
        type="text"
        placeholder="Search for an anime..."
      />
    </form>
  );
}
