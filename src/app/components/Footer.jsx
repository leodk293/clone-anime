"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaYoutube, FaTwitter, FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import Loader from "./loader/Loader";

export default function Footer() {
  const [topManga, setTopManga] = useState({
    error: false,
    data: [],
    loading: false,
  });
  const [topAnime, setTopAnime] = useState({
    error: false,
    data: [],
    loading: false,
  });
  const [topCharacters, setTopCharacters] = useState({
    error: false,
    data: [],
    loading: false,
  });

  const fetchWithRetry = async (url, retries = 3, delay = 2000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        if (response.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  async function getTopManga() {
    setTopManga({ error: false, loading: true, data: [] });
    try {
      const result = await fetchWithRetry("https://api.jikan.moe/v4/top/manga");
      setTopManga({
        error: false,
        loading: false,
        data: result.data,
      });
    } catch (error) {
      console.error(error.message);
      setTopManga({ error: true, loading: false, data: [] });
    }
  }

  async function getTopAnime() {
    setTopAnime({ error: false, loading: true, data: [] });
    try {
      const result = await fetchWithRetry("https://api.jikan.moe/v4/top/anime");
      setTopAnime({
        error: false,
        loading: false,
        data: result.data,
      });
    } catch (error) {
      console.error(error.message);
      setTopAnime({ error: true, loading: false, data: [] });
    }
  }

  async function getTopCharacters() {
    setTopCharacters({ error: false, loading: true, data: [] });
    try {
      const result = await fetchWithRetry(
        "https://api.jikan.moe/v4/top/characters"
      );
      setTopCharacters({
        error: false,
        loading: false,
        data: result.data,
      });
    } catch (error) {
      console.error(error.message);
      setTopCharacters({ error: true, loading: false, data: [] });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTopAnime();
        await new Promise((resolve) => setTimeout(resolve, 500));
        await getTopManga();
        await new Promise((resolve) => setTimeout(resolve, 500));
        await getTopCharacters();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderList = (items, loading, error, type) => {
    if (error) {
      return (
        <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
          Something went wrong.
        </p>
      );
    }
    if (loading) {
      return (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      );
    }
    if (items && items.length > 0) {
      return items.slice(0, 4).map((item) => {
        let href = "";
        switch (type) {
          case "anime":
            href = `/anime/${item.mal_id}`;
            break;
          case "manga":
            href = `/manga/data/${item.mal_id}`;
            break;
          case "character":
            href = `/characters/anime-character/${item.mal_id}`;
            break;
        }
        return (
          <Link
            className="text-gray-200 font-semibold underline underline-offset-2 hover:text-gray-400 duration-300"
            key={item.mal_id}
            href={href}
          >
            - {item.title || item.name}
          </Link>
        );
      });
    }
    return null;
  };

  return (
    <footer className="relative bottom-0 mt-[100px] text-white flex flex-col items-center gap-5 w-full h-full bg-[#26252c] py-10 px-5 md:px-1">
      <div className="flex flex-wrap gap-[60px]">
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">Top Anime</h1>
          <div className="pt-2 flex flex-col gap-1">
            {renderList(
              topAnime.data,
              topAnime.loading,
              topAnime.error,
              "anime"
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-xl">Top Manga</h1>
          <div className="pt-2 flex flex-col gap-1">
            {renderList(
              topManga.data,
              topManga.loading,
              topManga.error,
              "manga"
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-xl">Top Characters</h1>
          <div className="pt-2 flex flex-col gap-1">
            {renderList(
              topCharacters.data,
              topCharacters.loading,
              topCharacters.error,
              "character"
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-xl">Contact</h1>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link target="_blank" href={"https://x.com/Aboubac48530295"}>
              <div className="group flex justify-center items-center border border-transparent bg-[#f1f1f1] rounded-[50%] p-2 transition-all duration-300 hover:bg-[#1DA1F2]">
                <FaTwitter
                  className="text-black transition-all duration-300 group-hover:text-white"
                  size={25}
                />
              </div>
            </Link>

            <Link
              target="_blank"
              href={"https://www.linkedin.com/in/aboubacar-traore-495736252/"}
            >
              <div className="group flex justify-center items-center border border-transparent bg-[#f1f1f1] rounded-[50%] p-2 transition-all duration-300 hover:bg-[#0077B5]">
                <FaLinkedinIn
                  className="text-black transition-all duration-300 group-hover:text-white"
                  size={25}
                />
              </div>
            </Link>

            <Link
              target="_blank"
              href={"https://www.facebook.com/profile.php?id=100092315485742"}
            >
              <div className="group flex justify-center items-center border border-transparent bg-[#f1f1f1] rounded-[50%] p-2 transition-all duration-300 hover:bg-[#1877F2]">
                <FaFacebookF
                  className="text-black transition-all duration-300 group-hover:text-white"
                  size={25}
                />
              </div>
            </Link>

            <Link
              target="_blank"
              href={"https://www.facebook.com/profile.php?id=100092315485742"}
            >
              <div className="group flex justify-center items-center border border-transparent bg-[#f1f1f1] rounded-[50%] p-2 transition-all duration-300 hover:bg-red-500">
                <FaYoutube
                  className="text-black transition-all duration-300 group-hover:text-white"
                  size={25}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <span className="mt-4 bg-gray-50 md:w-[60%] md:h-[1px]" />

      <p className="italic font-semibold">
        Be aware of the best anime of the moment
      </p>
    </footer>
  );
}
