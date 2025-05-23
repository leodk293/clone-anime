"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import Loader from "../components/loader/Loader";
import ReadMore from "../components/readMore";
import SearchManga from "../components/SearchManga";
import Image from "next/image";

const MangaCard = ({ manga }) => (
  <div className="flex flex-col gap-2">
    <Link
      href={`/manga/data/${manga.mal_id}`}
      className="w-full flex justify-center"
    >
      <div className="flex flex-col gap-2 group w-full max-w-[200px]">
        <div className="relative overflow-hidden w-full aspect-[2/3] shadow-md rounded-lg">
          <Image
            width={200}
            height={300}
            alt={manga.title}
            src={manga.images.jpg.large_image_url}
            loading="lazy"
            className="w-full h-full object-cover border border-gray-200
              transform transition-all duration-300 group-hover:scale-105
              group-hover:shadow-lg"
          />
        </div>
      </div>
    </Link>
    <div className="w-full px-2">
      <ReadMore text={manga.title} maxLength={20} />
    </div>
  </div>
);

const SearchHeader = ({ title }) => (
  <header className="flex flex-col gap-2">
    <h1 className="font-bold capitalize text-2xl sm:text-3xl text-gray-900">
      {title}
    </h1>
    <div className="h-1 rounded-full bg-blue-500 w-24 sm:w-32" />
  </header>
);

const MangaGrid = ({ mangas }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full justify-items-center">
    {mangas.map((manga) => (
      <MangaCard key={nanoid(10)} manga={manga} />
    ))}
  </div>
);

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [searchState, setSearchState] = useState({
    query: "",
    error: false,
    loading: false,
    data: [],
  });

  const mangaName = useMemo(
    () => searchParams.get("manga") || "",
    [searchParams]
  );

  const fetchManga = async (query) => {
    if (!query) return;

    setSearchState((prev) => ({
      ...prev,
      loading: true,
      error: false,
    }));

    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?q=${query}&order_by=popularity&sort=asc&sfw`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();

      setSearchState((prev) => ({
        ...prev,
        loading: false,
        data,
        query,
      }));
    } catch (error) {
      console.error("Error fetching manga:", error);
      setSearchState((prev) => ({
        ...prev,
        loading: false,
        error: true,
        data: [],
      }));
    }
  };

  useEffect(() => {
    fetchManga(mangaName);
  }, [mangaName]);

  if (searchState.error) {
    return (
      <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (searchState.loading) {
    return (
      <div className="w-full flex justify-center">
        <Loader />
      </div>
    );
  }

  if (!searchState.data.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <div className="flex flex-col gap-5 w-auto md:w-[60%]">
        <SearchHeader title={mangaName} />
        <MangaGrid mangas={searchState.data} />
      </div>

      <div className="lg:w-80">
        <SearchManga />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchPageContent />
    </Suspense>
  );
}
