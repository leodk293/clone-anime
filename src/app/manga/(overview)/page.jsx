"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/app/components/loader/Loader";
import ReadMore from "@/app/components/readMore";
import SearchManga from "@/app/components/SearchManga";
import Image from "next/image";
import { nanoid } from "nanoid";

const ITEMS_PER_PAGE = 6;
const TOTAL_PAGES = 17;

export default function MangaPage() {
  const [mangaList, setMangaList] = useState({
    error: false,
    data: [],
    loading: false,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const fetchMangaList = async () => {
    setMangaList((prev) => ({ ...prev, loading: true, error: false }));

    try {
      const response = await fetch(
        "https://api.jikan.moe/v4/recommendations/manga"
      );
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
      }
      const result = await response.json();
      setMangaList({
        error: false,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      console.error(error.message);
      setMangaList({
        error: true,
        data: [],
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchMangaList();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationButtons = () => {
    return Array.from({ length: TOTAL_PAGES }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={`
          min-w-[40px] p-2 text-base sm:text-lg lg:text-xl font-bold
          ${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }
          hover:bg-blue-400 hover:text-white transition-colors duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-400
          rounded-md
        `}
      >
        {index + 1}
      </button>
    ));
  };

  const renderMangaGrid = () => {
    if (mangaList.error) {
      return (
        <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
          Something went wrong. Please try again later.
        </p>
      );
    }

    if (mangaList.loading) {
      return (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      );
    }

    if (mangaList.data.length === 0) {
      return (
        <p className="text-lg sm:text-xl px-4 text-center">No manga found.</p>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full justify-items-center">
        {mangaList.data.slice(startIndex, endIndex).map((manga) =>
          manga.entry.map((element) => (
            <div key={nanoid(10)} className=" flex flex-col gap-2">
              <Link
                href={`/manga/data/${element.mal_id}`}
                className="w-full flex justify-center"
              >
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
              </Link>
              <div className="w-full px-2">
                <ReadMore text={element.title} maxLength={10} />
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
              <h1 className="font-bold text-2xl sm:text-3xl text-gray-900">
                Manga List
              </h1>
              <div className="h-1 rounded-full bg-red-500 w-24 sm:w-32" />
            </header>

            {renderMangaGrid()}

            <nav className="mt-6 flex justify-center">
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 max-w-full scrollbar-custom">
                {renderPaginationButtons()}
              </div>
            </nav>
          </div>

          <div className="lg:w-80">
            <SearchManga />
          </div>
        </div>
      </div>
    </main>
  );
}
