"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchAnime from "../components/Search";
import Loader from "../components/loader/Loader";
import ReadMore from "../components/readMore";

import { nanoid } from "nanoid";

export default function Characters() {
  const [topCharacters, setTopCharacters] = useState({
    error: false,
    data: [],
    loading: false,
  });

  async function fetchTopCharacters() {
    setTopCharacters({
      error: false,
      data: [],
      loading: true,
    });
    try {
      const res = await fetch(`https://api.jikan.moe/v4/top/characters`);
      if (!res.ok) {
        throw new Error(res.status);
      }
      const result = await res.json();
      setTopCharacters({
        error: false,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      setTopCharacters({
        error: true,
        data: [],
        loading: false,
      });
    }
  }

  useEffect(() => {
    fetchTopCharacters();
  }, []);

  return (
    <>
      {topCharacters.error === true ? (
        <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
          Something went wrong. Please try again later.
        </p>
      ) : topCharacters.loading === true ? (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      ) : (
        <main className="w-full min-h-screen ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 flex flex-col gap-6">
                <header className="flex flex-col gap-2">
                  <h1 className="font-bold text-2xl sm:text-3xl text-gray-900">
                    Favorite characters
                  </h1>
                  <div className="h-1 rounded-full bg-blue-500 w-24 sm:w-32" />
                </header>

                {topCharacters.data.length > 0 && topCharacters.data && (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full justify-items-center">
                    {topCharacters.data.map((character) => (
                      <div className=" flex flex-col gap-2" key={nanoid(10)}>
                        <Link
                          href={`/characters/anime-character/${character.mal_id}`}
                        >
                          <div className="flex flex-col gap-2 group w-full max-w-[200px]">
                            <div className="relative overflow-hidden w-full aspect-[2/3] shadow-md rounded-lg">
                              <img
                                alt={character.name}
                                src={character.images.jpg.image_url}
                                className="w-full h-full object-cover border border-gray-200
            transform transition-all duration-300 group-hover:scale-105
            group-hover:shadow-lg"
                              />
                            </div>
                          </div>
                        </Link>
                        <div className="w-full px-2">
                          <ReadMore text={character.name} maxLength={10} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:w-80">
                <SearchAnime />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
