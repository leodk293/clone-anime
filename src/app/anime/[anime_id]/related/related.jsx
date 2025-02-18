"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./styles.css";
import Loader from "@/app/components/loader/Loader";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, maxRetries = 3, initialDelay = 1000) {
  let lastError;
  let delayTime = initialDelay;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : delayTime;
        await delay(waitTime);
        delayTime *= 2;
        continue;
      }

      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      lastError = error;
      if (i === maxRetries - 1) throw lastError;
      await delay(delayTime);
      delayTime *= 2;
    }
  }
}

export default function Related({ anime_id }) {
  const [relatedAnime, setRelatedAnime] = useState({
    error: false,
    data: [],
    loading: false,
  });

  const [targetAnime, setTargetAnime] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  async function getTargetAnimeName() {
    try {
      const result = await fetchWithRetry(
        `https://api.jikan.moe/v4/anime/${anime_id}`
      );
      setTargetAnime(result.data.title);
    } catch (error) {
      console.error("Error fetching anime name:", error.message);
      setTargetAnime("");
    }
  }

  async function fetchRelatedAnime() {
    setRelatedAnime({
      error: false,
      data: [],
      loading: true,
    });

    try {
      const result = await fetchWithRetry(
        `https://api.jikan.moe/v4/anime/${anime_id}/recommendations`
      );
      setRelatedAnime({
        error: false,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching related anime:", error.message);
      setRelatedAnime({
        error: true,
        data: [],
        loading: false,
      });
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await getTargetAnimeName();
      await delay(1000);
      await fetchRelatedAnime();
    };

    loadData();
  }, [anime_id]);

  const handleRetry = async () => {
    setRetryCount((prev) => prev + 1);
    await fetchRelatedAnime();
  };

  return (
    <>
      {relatedAnime.error ? (
        <div className="text-center py-4">
          <p className="text-lg sm:text-xl font-bold text-red-900 mb-4">
            Something went wrong.
          </p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : relatedAnime.loading ? (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      ) : (
        relatedAnime.data.length > 0 && (
          <section className="mt-10 flex flex-col w-full">
            {targetAnime && (
              <h1 className="font-bold md:text-xl">
                Anime related to{" "}
                <span className="font-extrabold">{targetAnime}</span>
              </h1>
            )}
            {relatedAnime.data.length > 0 && (
              <div className="mt-5 scrollbar-custom flex w-auto flex-row overflow-x-scroll gap-5 pb-4 md:w-[60rem]">
                {relatedAnime.data.map((anime) => (
                  <Link
                    key={anime.entry.mal_id}
                    href={`/anime/${anime.entry.mal_id}`}
                    className="flex-shrink-0 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-32 sm:w-40 rounded-lg overflow-hidden bg-blue-400 p-1 hover:opacity-90 duration-500 ">
                      <img
                        className="w-full h-48 sm:h-56 object-cover rounded-lg"
                        src={anime.entry.images.jpg.image_url}
                        alt={anime.entry.title}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )
      )}
    </>
  );
}
