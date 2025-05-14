"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import SearchAnime from "../components/Search";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import ReadMore from "../components/readMore";
import googleImage from "../assets/google-logo.png";
import { Delete } from "lucide-react";

export default function FavoriteAnimePage() {
  const [animeId, setAnimeId] = useState({
    error: false,
    data: [],
  });
  const [animeData, setAnimeData] = useState([]);
  const { data: session, status } = useSession();

  const notify = () => {
    toast.success("Removed from favorite list", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  async function getFavAnimeId() {
    try {
      const response = await fetch(
        `/api/favoriteAnime?userId=${session?.user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        setAnimeId({
          error: true,
          data: [],
        });
        throw new Error("Failed to fetch anime Id");
      }
      const data = await response.json();
      setAnimeId({
        error: false,
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      setAnimeId({
        error: true,
        data: [],
      });
    }
  }

  async function getFavAnimeData(animeId) {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${animeId}/full`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch anime data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async function removeFromFavorite(animeId, userId) {
    try {
      const response = await fetch(
        `/api/favoriteAnime?userId=${userId}&animeId=${animeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove anime from favorites");
      }
      notify();
      getFavAnimeId();
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (session) {
      getFavAnimeId();
    }
  }, [session]);

  useEffect(() => {
    const fetchAnimeData = async () => {
      if (animeId.data.length > 0) {
        const data = await Promise.all(
          animeId.data.map((anime) => getFavAnimeData(anime.animeId))
        );
        setAnimeData(data.filter(Boolean));
      }
    };
    fetchAnimeData();
  }, [animeId.data]);

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-[20vh] mt-10">
        <h1 className="text-2xl font-bold mb-4">
          Signup first to create your favorite list.
        </h1>
        <button
          onClick={() => signIn("google")}
          className=" flex flex-row gap-1 text-xl font-bold border border-gray-100 bg-white px-4 py-2 shadow cursor-pointer justify-center items-center rounded-full"
        >
          <Image
            className=" self-center"
            src={googleImage}
            alt="google-logo"
            width={30}
            height={30}
          />
          <p className=" self-center">Signin</p>
        </button>
      </div>
    );
  }

  if (animeId.error) {
    return (
      <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (animeId.data.length === 0) {
    return (
      <p className="text-lg sm:text-xl font-bold h-[30vh] mt-10 text-center">
        You have no favorite anime.
      </p>
    );
  }

  return (
    <main className="w-full min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <header className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl sm:text-3xl text-gray-900">
                Your Favorite Anime List
              </h1>
              <div className="h-1 rounded-full bg-blue-500 w-24 sm:w-32" />
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full justify-items-center">
              {animeData.map((anime) => (
                <div className=" flex flex-col gap-2" key={anime.data.mal_id}>
                  <button
                  title="Remove"
                    onClick={() =>
                      removeFromFavorite(anime.data.mal_id, session?.user?.id)
                    }
                    className=" self-start text-sm border border-transparent bg-[#26252c] text-white p-1 italic font-medium rounded-[5px] hover:bg-red-800 duration-300"
                  >
                    <Delete size={20} color="#ffffff" strokeWidth={1.75} />
                  </button>
                  <Link
                    href={`/anime/${anime.data.mal_id}`}
                    className="w-full flex justify-center"
                  >
                    <div className="flex flex-col gap-2 group w-full max-w-[200px]">
                      <div className="relative overflow-hidden w-full aspect-[2/3] shadow-md rounded-lg">
                        <Image
                          alt={anime.data.title}
                          src={anime.data.images.jpg.large_image_url}
                          width={200}
                          height={300}
                          className="w-full h-full object-cover border border-gray-200
            transform transition-all duration-300 group-hover:scale-105
            group-hover:shadow-lg"
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="w-full px-2">
                    <ReadMore text={anime.data.title} maxLength={10} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ToastContainer />

          <div className="lg:w-80">
            <SearchAnime />
          </div>
        </div>
      </div>
    </main>
  );
}
