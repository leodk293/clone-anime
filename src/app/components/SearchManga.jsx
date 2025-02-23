"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import mangaList from "./mangaList";

export default function SearchManga() {
  
  const [mangaName, setMangaName] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mangaName.trim()) {
      router.push(`/manga-search?manga=${encodeURIComponent(mangaName)}`);
      setMangaName("");
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-black mt-10 self-start p-2 rounded-[10px] flex flex-row gap-4 items-center justify-center md:mt-[12rem]"
    >
      <Search className="self-center" />
      <input
        list="manga"
        required
        className="self-center outline-none text-black text-xl font-semibold placeholder:text-black"
        type="text"
        placeholder={"Search for a manga..."}
        onChange={(e) => setMangaName(e.target.value)}
        value={mangaName}
      />
      <datalist id="manga">
        {mangaList.map((manga) => (
          <option value={manga} key={nanoid(10)}>{manga}</option>
        ))}
      </datalist>
    </form>
  );
}
