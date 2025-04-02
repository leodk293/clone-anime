"use client";
import { nanoid } from "nanoid";
import React from "react";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import Loader from "@/app/components/loader/Loader";
import { MoveLeft, MoveRight } from "lucide-react";
import SearchAnime from "@/app/components/Search";
import { useRouter } from "next/navigation";

export default function Episode({ params }) {
  const resolvedParams = use(params);
  const anime_id = resolvedParams.anime_id;
  const episode_id = resolvedParams.episode_id;

  const [episodeNumber, setEpisodeNumber] = useState(Number(episode_id));

  const [episodes, setEpisodes] = useState([]);
  let tabEpisode = [];

  const [epData, setEpData] = useState({
    error: false,
    data: undefined,
    loading: false,
  });
  const [animeName, setAnimeName] = useState(null);

  async function getNumberOfEpisode() {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${anime_id}`);
      const result = await res.json();
      setAnimeName(result.data.title);

      for (let i = 1; i <= result.data.episodes; i++) {
        tabEpisode.push(i);
      }

      setEpisodes(tabEpisode);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getEpisodeData() {
    setEpData({
      error: false,
      data: undefined,
      loading: true,
    });
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${anime_id}/episodes/${episodeNumber}`
      );
      const result = await res.json();
      setEpData({
        error: false,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      console.error(error.message);
      setEpData({
        error: true,
        data: undefined,
        loading: false,
      });
    }
  }

  const router = useRouter();

  const handleNextEpisode = () => {
    const nextEpisode = episodeNumber + 1;
    setEpisodeNumber(nextEpisode);
    router.push(`/anime/${anime_id}/episode/${nextEpisode}`);
  };

  const handlePrevEpisode = () => {
    const prevEpisode = episodeNumber - 1;
    setEpisodeNumber(prevEpisode);
    router.push(`/anime/${anime_id}/episode/${prevEpisode}`);
  };

  const handleSelectedEpisode = (event) => {
    const selectedEpisode = event.target.value;
    setEpisodeNumber(selectedEpisode);
    router.push(`/anime/${anime_id}/episode/${selectedEpisode}`);
  };
  console.log(episodes.length);

  useEffect(() => {
    getNumberOfEpisode();
  }, []);

  useEffect(() => {
    getEpisodeData();
  }, [episodeNumber]);
  return (
    <div className=" flex flex-col items-center mt-[70px] w-auto ">
      <Link className="self-start" href={`/anime/${anime_id}`}>
        <button className=" flex flex-row gap-1 justify-center items-center border border-transparent bg-black rounded-[5px] text-white text-xl px-4 py-2 font-semibold hover:translate-x-[-5px] duration-200">
          <MoveLeft size={20} className=" self-center" />
          <p className=" self-center">Go Back</p>
        </button>
      </Link>
      {epData.data && (
        <div className=" flex flex-col gap-4 items-center">
          <h1 className=" text-2xl text-center font-bold md:text-3xl">
            {animeName && animeName}{" "}
          </h1>
          <p className=" font-semibold text-xl md:text-2xl">
            {episodeNumber !== episodes.length / 2
              ? `Ep${episodeNumber}`
              : "Last Ep"}
            : {epData.data.title}
          </p>
        </div>
      )}
      <div className=" self-center flex flex-wrap justify-between gap-10 mt-5 md:w-[65%] md:gap-0">
        <div className=" flex flex-row gap-4">
          <p className=" text-xl font-semibold self-center">Filter Episode</p>
          <select
            onChange={handleSelectedEpisode}
            className=" bg-black text-white p-1 rounded-[5px] cursor-pointer"
          >
            {episodes.map((ep) => (
              <option key={nanoid(10)} value={ep}>
                {ep}
              </option>
            ))}
          </select>
        </div>

        <div className=" flex flex-row gap-2">
          {episodeNumber !== 1 ? (
            <button
              onClick={handlePrevEpisode}
              className=" font-semibold flex flex-row gap-2 border border-transparent bg-black text-white px-4 py-2 rounded-[5px] hover:translate-x-[-5px] duration-200"
            >
              <MoveLeft color="#ffffff" />
              <p>Prev</p>
            </button>
          ) : null}

          {episodeNumber !== episodes.length / 2 ? (
            <button
              onClick={handleNextEpisode}
              className=" font-semibold flex flex-row gap-2 border border-transparent bg-black text-white px-4 py-2 rounded-[5px] hover:translate-x-[5px] duration-200"
            >
              <p>Next</p>
              <MoveRight color="#ffffff" />
            </button>
          ) : null}
        </div>
      </div>

      {epData.error === true ? (
        <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
          Something went wrong. Please try again later.
        </p>
      ) : epData.loading === true ? (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className=" flex flex-col w-auto gap-5 mt-5 md:w-[65%]">
          <span className=" h-[1px] bg-gray-500" />

          {epData.data ? (
            <p className=" text-[15px] italic leading-9 md:text-[18px] md:leading-10">
              {epData.data && epData.data.synopsis}
            </p>
          ) : (
            <p className=" flex justify-center items-center text-center h-auto text-xl font-bold text-gray-600 md:h-[10rem]">
              Sorry, Episode not found
            </p>
          )}
          <span className=" h-[1px] bg-gray-500" />
          <div className=" translate-y-[-1rem] md:translate-y-[-9rem]">
            <SearchAnime />
          </div>
        </div>
      )}
    </div>
  );
}
