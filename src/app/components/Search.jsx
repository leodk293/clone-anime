"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import animeList from "./animeList";
import { nanoid } from "nanoid";

export default function SearchAnime() {
  const [animeName, setAnimeName] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (animeName.trim()) {
      router.push(`/search?anime=${encodeURIComponent(animeName)}`);
      setAnimeName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-black mt-10 self-start p-2 rounded-[10px] flex flex-row gap-4 items-center justify-center md:mt-[12rem]"
    >
      <Search className="self-center" />
      <input
        list="anime"
        required
        className="self-center outline-none text-black text-xl font-semibold placeholder:text-black"
        type="text"
        placeholder="Search for an anime..."
        onChange={(e) => setAnimeName(e.target.value)}
        value={animeName}
      />
      <datalist id="anime">
        {animeList.map((anime) => (
          <option key={nanoid(10)} value={anime}>
            {anime}
          </option>
        ))}
      </datalist>
    </form>
  );
}
