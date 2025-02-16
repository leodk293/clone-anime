"use client";
import React, {useState} from "react";
import { Search } from "lucide-react";

export default function SearchAnime() {
  const [anime, setAnime] = useState([]);
  let popularAnime = [];
  let topAnime = [];
  let listAnime = [];
  let airingAnime = [];
  let upcomingAnime = [];

  


  return (
    <form className="border-2 border-black mt-10 self-start p-2 rounded-[10px] flex flex-row gap-4 items-center justify-center md:mt-[12rem]">
      <Search className="self-center" />
      <datalist id="anime"></datalist>
      <input
        required
        list="anime"
        className="self-center outline-none text-black text-xl font-semibold placeholder:text-black"
        type="text"
        placeholder="Search for an anime..."
      />
    </form>
  );
}
