"use client";
import { useState, useEffect, use } from "react";
import SearchAnime from "@/app/components/Search";
import Loader from "@/app/components/loader/Loader";
import ReadMore from "@/app/components/readMore";
import { nanoid } from "nanoid";
import Link from "next/link";
import Image from "next/image";
import "../../../globals.css";

export default function List({ params }) {
  const [animeList, setAnimeList] = useState({
    error: false,
    data: [],
    loading: false,
  });

  const resolvedParams = use(params);
  const pageId = parseInt(resolvedParams.id, 10) || 1;

  const ITEMS_PER_PAGE = 6;
  const startIndex = (pageId - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const fetchAnimeList = async () => {
    setAnimeList((prev) => ({ ...prev, loading: true, error: false }));

    try {
      const response = await fetch(
        "https://api.jikan.moe/v4/recommendations/anime"
      );
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
      }
      const result = await response.json();
      setAnimeList({
        error: false,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      console.error(error.message);
      setAnimeList({
        error: true,
        data: [],
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchAnimeList();
  }, []);

  const renderAnimeGrid = () => {
    if (animeList.error) {
      return (
        <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
          Something went wrong. Please try again later.
        </p>
      );
    }

    if (animeList.loading) {
      return (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      );
    }

    if (animeList.data.length === 0) {
      return (
        <p className="text-lg sm:text-xl px-4 text-center">No anime found.</p>
      );
    }

    // Slice the data array based on current page
    const currentPageData = animeList.data.slice(startIndex, endIndex);

    if (currentPageData.length === 0) {
      return (
        <p className="text-lg sm:text-xl px-4 text-center">
          No anime found on this page.{" "}
          <Link href="/list-anime/1" className="text-blue-500 hover:underline">
            Go to first page
          </Link>
        </p>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full justify-items-center">
        {currentPageData.map((anime) =>
          anime.entry.map((element) => (
            <div key={nanoid(10)} className="flex flex-col gap-2">
              <Link
                className="w-full flex justify-center"
                href={`/anime/${element.mal_id}`}
              >
                <div className="w-full flex justify-center">
                  <div className="flex flex-col gap-2 group w-full max-w-[200px]">
                    <div className="relative overflow-hidden w-full aspect-[2/3] shadow-md rounded-lg">
                      <Image
                      width={200}
                      height={300}
                        alt={element.title}
                        src={element.images.jpg.large_image_url}
                        className="w-full h-full object-cover border border-gray-200
                      transform transition-all duration-300 group-hover:scale-105
                      group-hover:shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </Link>

              <div className="w-full px-2">
                <ReadMore text={element.title} maxLength={20} />
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <main className="w-full min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <header className="flex flex-col gap-2">
              {/* <h1 className="font-bold text-2xl sm:text-3xl text-gray-900">
                List Anime - Page {pageId}
              </h1> */}
              <h1 className="font-bold text-2xl sm:text-3xl text-gray-900">
                List Anime
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
