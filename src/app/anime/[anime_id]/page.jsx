"use client";
import { useState, useEffect, use } from "react";
import { Star, RotateCcw } from "lucide-react";
import Link from "next/link";
import { nanoid } from "nanoid";
import Loader from "@/app/components/loader/Loader";
import ReadMore from "@/app/components/readMore";
import SearchAnime from "@/app/components/Search";

import Related from "./related/related";

const VideoModal = ({ isOpen, onClose, trailerUrl }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className={trailerUrl ? "border-2 border-white shadow-lg" : ""}
        onClick={(e) => e.stopPropagation()}
      >
        {trailerUrl ? (
          <iframe
            width="900"
            height="450"
            className="w-auto h-[250px] md:w-[900px] md:h-[450px]"
            src={trailerUrl}
            title="Anime Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p className="text-xl font-bold text-white">No trailer available</p>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  if (!value) return null;
  return (
    <p className="font-bold md:text-[17px]">
      {label}: <span className="text-gray-600">{value}</span>
    </p>
  );
};

const SectionHeader = ({ title }) => (
  <div className=" flex flex-col">
    <div className="flex flex-row gap-2">
      <div className="border border-transparent bg-black p-1">
        <Star color="#ffffff" />
      </div>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
    <span className="w-full h-[1px] bg-gray-900" />
  </div>
);

export default function AnimePage({ params }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animeData, setAnimeData] = useState({
    error: false,
    data: null,
    loading: false,
  });
  const [episodeTitles, setEpisodeTitles] = useState({});

  const resolvedParams = use(params);

  const id = resolvedParams.anime_id;

  const fetchAnimeData = async () => {
    setAnimeData((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const { data } = await response.json();

      setAnimeData({
        error: false,
        data: {
          ...data,
          studios: data.studios.map((s) => s.name),
          genres: data.genres.map((g) => g.name).join(", "),
          episodes: Array.from({ length: data.episodes }, (_, i) => i + 1),
        },
        loading: false,
      });

      // Fetch episode titles if there are episodes
      if (data.episodes > 0) {
        const episodeResponse = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/episodes`
        );
        if (episodeResponse.ok) {
          const episodeData = await episodeResponse.json();
          const titles = Object.fromEntries(
            episodeData.data.map((episode) => [episode.mal_id, episode.title])
          );
          setEpisodeTitles(titles);
        }
      }
    } catch (error) {
      console.error("Error fetching anime data:", error);
      setAnimeData({ error: true, data: null, loading: false });
    }
  };

  useEffect(() => {
    fetchAnimeData();
  }, [id]);

  if (animeData.error) {
    return (
      <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (animeData.loading) {
    return (
      <div className="w-full flex justify-center md:h-[20rem]">
        <Loader />
      </div>
    );
  }

  if (!animeData.data) return null;

  const { data } = animeData;

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
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="bg-black bg-opacity-50 rounded-full p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        width="48"
                        height="48"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
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
                  <InfoItem label="Studios" value={data.studios.join(", ")} />
                  <InfoItem label="String" value={data.aired.string} />
                  <InfoItem label="Genre(s)" value={data.genres} />

                  {animeData.data.episodes.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
                      <Link href={`/anime/${id}/episode/${1}`}>
                        <button className="border border-transparent text-xl text-white font-bold px-5 py-2 bg-black rounded-[5px] hover:bg-gray-800 hover:translate-y-[-5px] duration-300">
                          First EP
                        </button>
                      </Link>
                      <Link
                        href={`/anime/${id}/episode/${data.episodes.length}`}
                      >
                        <button className="border border-transparent text-xl text-white font-bold px-5 py-2 bg-black rounded-[5px] hover:bg-gray-800 hover:translate-y-[-5px] duration-300">
                          Last Ep
                        </button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <SectionHeader title="Synopsis" />

              <div className="text-gray-700 font-semibold mt-4">
                <ReadMore text={data.synopsis} maxLength={180} />
              </div>
            </div>

            <div className="mt-10">
              <SectionHeader
                title={`Episodes List (${data.episodes.length})`}
              />

              <div className="mt-10 flex flex-col gap-2">
                {data.episodes.length > 0 ? (
                  data.episodes.map((episode) => (
                    <section key={nanoid(10)} className="flex flex-col gap-2">
                      <Link
                        className="rounded-[5px] p-1 hover:bg-[#f1f1f1] duration-500"
                        href={`/anime/${id}/episode/${episode}`}
                      >
                        <div className="font-semibold text-[13px] flex flex-row justify-between md:text-[16px] ">
                          <p className="text-black">
                            {data.title} - {episode}
                          </p>
                          {episodeTitles[episode] && (
                            <p className="text-gray-500 italic">
                              {episodeTitles[episode]}
                            </p>
                          )}
                        </div>
                      </Link>
                      {episode !== data.episodes.length && (
                        <span className="w-full h-[1px] bg-gray-400" />
                      )}
                    </section>
                  ))
                ) : (
                  <p className=" text-xl font-semibold text-gray-700">
                    No available episode yet
                  </p>
                )}
              </div>
            </div>

            {data.status === "Not yet aired" ? null : <Related anime_id={id} />}
          </div>

          <div className="lg:w-80">
            <SearchAnime />
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trailerUrl={data.trailer?.embed_url}
      />
    </main>
  );
}
