"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { nanoid } from "nanoid";

export default function Page() {
  const tab = [1, 2, 2, 4, 5, 6, 7];

  return (
    <main className="w-full flex flex-wrap justify-center items-center md:w-[90%] mx-auto">
      <div className=" flex flex-col gap-5 md:w-[55%]">

        <div className=" flex flex-col gap-1">
            <p className=" font-bold text-3xl">Airing Anime...</p>
            <span className=" h-[2px] rounded-[10px] bg-black w-[90%]"/>
        </div>

        <div className="flex flex-wrap gap-8">
          {tab.map((element) => (
            <div
              className="w-[100px] h-[150px] object-cover bg-black md:w-[200px] md:h-[300px]"
              key={nanoid(10)}
            ></div>
          ))}
        </div>
        
      </div>

      <form className="border-2 border-black mt-10 self-start p-2 rounded-[10px] flex flex-row gap-4 md:w-[25%] items-center justify-center md:mt-[12rem]">
        <Search className="self-center" />
        <input
          className="self-center outline-none text-black text-xl font-semibold placeholder:text-black"
          type="text"
          placeholder="Search for an anime..."
        />
      </form>
    </main>
  );
}
