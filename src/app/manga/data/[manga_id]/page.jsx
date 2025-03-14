"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Book } from "lucide-react";
import { nanoid } from "nanoid";
import Loader from "@/app/components/loader/Loader";
import ReadMore from "@/app/components/readMore";
import SearchManga from "@/app/components/SearchManga";
import "./styles.css";

const InfoItem = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="font-bold flex flex-row gap-2 md:text-[17px]">
      {label}: <span className="text-gray-600">{value}</span>
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <div className=" flex flex-col">
    <div className="flex flex-row gap-2">
      <div className="border border-transparent bg-black p-1">
        <Book color="#ffffff" />
      </div>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
    <span className="w-full h-[1px] bg-gray-900" />
  </div>
);

export default function MangaData({ params }) {
  const [mangaData, setMangaData] = useState({
    error: false,
    data: null,
    loading: false,
  });

  const resolvedParams = use(params);

  const id = resolvedParams.manga_id;

  const fetchMangaData = async () => {
    setMangaData((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}/full`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const { data } = await response.json();

      setMangaData({
        error: false,
        data: data,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching manga data:", error);
      setMangaData({ error: true, data: null, loading: false });
    }
  };

  const [mangaCharacters, setMangaCharacters] = useState({
    error: false,
    data: [],
    loading: false,
  });

  const fetchMangaCharacters = async () => {
    setMangaCharacters({
      error: false,
      data: [],
      loading: true,
    });
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/manga/${id}/characters`
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const result = await response.json();
      setMangaCharacters({
        error: false,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      setMangaCharacters({
        error: true,
        data: [],
        loading: false,
      });
    }
  };

  const [relatedManga, setRelatedManga] = useState({
    error: false,
    data: [],
    loading: false,
  });

  const fetchRelatedManga = async () => {
    setRelatedManga({
      error: false,
      data: [],
      loading: true,
    });
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/manga/${id}/recommendations`
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const result = await response.json();
      setRelatedManga({
        error: false,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      console.error(error.message);
      setRelatedManga({
        error: true,
        data: [],
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchMangaData();
    fetchMangaCharacters();
    fetchRelatedManga();
  }, [id]);

  if (mangaData.error) {
    return (
      <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (mangaData.loading) {
    return (
      <div className="w-full flex justify-center md:h-[20rem]">
        <Loader />
      </div>
    );
  }

  if (!mangaData.data) return null;

  const { data } = mangaData;

  return (
    <main className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-2xl sm:text-4xl text-gray-900">{data.title}</h1>

            <div className="flex flex-col gap-5 md:mt-5">
              <div className="flex flex-wrap gap-10">
                <div className="self-center relative group">
                  <img
                    className="self-center border border-gray-700 object-cover md:h-[350px] w-full"
                    src={data.images.jpg.image_url}
                    alt={data.title}
                  />
                </div>

                <div className="font-bold self-center flex flex-col gap-4">
                  <InfoItem label="Native" value={data.title} />
                  <InfoItem label="Romaji" value={data.title_japanese} />
                  <InfoItem label="English" value={data.title_english} />
                  <InfoItem
                    label="Note"
                    value={data.score && `${data.score}/10`}
                  />
                  <InfoItem label="Type" value={data.type} />
                  <InfoItem label="Status" value={data.status} />
                  <InfoItem
                    label="Authors"
                    value={data.authors.map((author) => (
                      <span key={nanoid(10)}>{author.name}</span>
                    ))}
                  />
                  <InfoItem label="String" value={data.published.string} />
                  <InfoItem
                    label="Magazine"
                    value={data.serializations.map((element) => (
                      <span key={nanoid(10)}>{element.name}</span>
                    ))}
                  />
                  <InfoItem
                    label="Genre(s)"
                    value={
                      <div className=" flex flex-row">
                        {data.genres.map((element, index) => (
                          <span key={nanoid(10)}>
                            {}
                            {index === 0 ? null : " - "} {element.name}
                          </span>
                        ))}
                      </div>
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <SectionHeader title="Synopsis" />

              <div className="text-gray-700 font-semibold mt-4">
                <ReadMore text={data.synopsis} maxLength={250} />
              </div>
            </div>

            {data.background ? (
              <div className="mt-10">
                <SectionHeader title="Background" />

                <div className="text-gray-700 font-semibold mt-4">
                  <ReadMore text={data.background} maxLength={250} />
                </div>
              </div>
            ) : null}

            {mangaCharacters.error === true ? (
              <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
                Something went wrong. Please try again later.
              </p>
            ) : mangaCharacters.loading === true ? (
              <div className="w-full flex justify-center">
                <Loader />
              </div>
            ) : mangaCharacters.data.length > 0 ? (
              mangaCharacters.data && (
                <div className=" flex flex-col gap-5 mt-10">
                  <h1 className=" font-bold md:text-xl">
                    <span className=" font-extrabold">{data.title}</span>&apos;s
                    Characters
                  </h1>
                  <div className=" scrollbar-custom flex w-[20rem] flex-row overflow-x-scroll gap-5 pb-4 md:w-[60rem]">
                    {mangaCharacters.data.map((character) => (
                      <Link
                        key={character.character.mal_id}
                        href={`/manga/data/${id}/manga-character/${character.character.mal_id}`}
                      >
                        <div className=" border border-gray-300 bg-white shadow rounded-[5px] p-1 w-32 sm:w-40 overflow-hidden hover:bg-slate-100 duration-500 flex flex-col items-center gap-1">
                          <img
                            className="w-full h-48 sm:h-56 object-cover rounded-lg"
                            src={character.character.images.jpg.image_url}
                            alt={character.character.name}
                          />
                          <p className=" font-semibold">{character.role}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <p className=" text-center text-xl font-semibold text-blue-950">
                No characters found
              </p>
            )}

            <div className="flex flex-col gap-5 mt-10">
              {relatedManga.data.length > 0 ? (
                <h1 className=" font-bold md:text-xl">
                  Manga related to{" "}
                  <span className=" font-extrabold">{data.title}</span>
                </h1>
              ) : null}

              {relatedManga.error === true ? (
                <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
                  Something went wrong. Please try again later.
                </p>
              ) : relatedManga.loading === true ? (
                <div className="w-full flex justify-center">
                  <Loader />
                </div>
              ) : (
                relatedManga.data.length > 0 &&
                relatedManga.data && (
                  <div className=" scrollbar-custom flex w-[20rem] flex-row overflow-x-scroll gap-5 pb-4 md:w-[60rem]">
                    {relatedManga.data.map((manga) => (
                      <Link
                        key={manga.entry.mal_id}
                        href={`/manga/data/${manga.entry.mal_id}`}
                      >
                        <div className=" bg-red-400 shadow rounded-[5px] p-1 w-32 sm:w-40 overflow-hidden hover:opacity-90 duration-500">
                          <img
                            className="w-full h-48 sm:h-56 object-cover rounded-lg"
                            src={manga.entry.images.jpg.image_url}
                            alt={manga.entry.title}
                            loading="lazy"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="lg:w-80">
            <SearchManga />
          </div>
        </div>
      </div>
    </main>
  );
}
