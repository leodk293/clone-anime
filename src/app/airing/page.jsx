"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchAnime from "../components/Search";
import Loader from "../components/loader/Loader";
import ReadMore from "../components/readMore";

import { nanoid } from "nanoid";

export default function Airing() {
  const [airingAnime, setAiringAnime] = useState({
    error: false,
    data: [],
    loading: false,
  });

  const fetchAiringAnime = async () => {
    setAiringAnime((prev) => ({ ...prev, loading: true, error: false }));

    try {
      const response = await fetch(
        "https://api.jikan.moe/v4/top/anime?filter=airing"
      );
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
      }
      const result = await response.json();
      setAiringAnime({
        error: false,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      console.error(error.message);
      setAiringAnime({
        error: true,
        data: [],
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchAiringAnime();
  }, []);

  const renderAnimeGrid = () => {
    if (airingAnime.error) {
      return (
        <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
          Something went wrong. Please try again later.
        </p>
      );
    }

    if (airingAnime.loading) {
      return (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      );
    }

    if (airingAnime.data.length === 0) {
      return (
        <p className="text-lg sm:text-xl px-4 text-center">No anime found.</p>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full justify-items-center">
        {airingAnime.data.map((anime) => (
          <div className=" flex flex-col gap-2" key={nanoid(10)}>
            <Link href={`/anime/${anime.mal_id}`} className="w-full flex justify-center">
              <div className="flex flex-col gap-2 group w-full max-w-[200px]">
                <div className="relative overflow-hidden w-full aspect-[2/3] shadow-md rounded-lg">
                  <img
                    alt={anime.title}
                    src={anime.images.jpg.large_image_url}
                    className="w-full h-full object-cover border border-gray-200
            transform transition-all duration-300 group-hover:scale-105
            group-hover:shadow-lg"
                  />
                </div>
              </div>
            </Link>
            <div className="w-full px-2">
              <ReadMore text={anime.title} maxLength={10} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="w-full min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 flex flex-col gap-6">
            <header className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl sm:text-3xl text-gray-900">
                Anime on air
              </h1>
              <div className="h-1 rounded-full bg-blue-500 w-24 sm:w-32" />
            </header>

            {renderAnimeGrid()}
          </div>

          <div className="lg:w-80">
            <SearchAnime />
          </div>
        </div>
      </div>
    </main>
  );
}
