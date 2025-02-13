"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import Loader from "@/app/components/loader/Loader";

export default function Related({ anime_id }) {
  const [relatedAnime, setRelatedAnime] = useState({
    error: false,
    data: undefined,
    loading: false,
  });

  async function fetchRelatedAnime() {
    setRelatedAnime({
      error: false,
      data: undefined,
      loading: true,
    });

    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${anime_id}/recommendations`);
      if (!res.ok) {
        throw new Error(`An error has occurred ${res.status}`);
      }
      const result = await res.json();
      setRelatedAnime({
        error: false,
        data: result.data,
        loading: false,
      });
    } catch (error) {
      console.error(error.message);
      setRelatedAnime({
        error: true,
        data: undefined,
        loading: false,
      });
    }
  }

  useEffect(() => {
    fetchRelatedAnime();
  }, []);
  return (
    <>
      {relatedAnime.error === true ? (
        <p className="text-lg sm:text-xl font-bold text-red-900 h-auto px-4 text-center">
          Something went wrong. Please try again later.
        </p>
      ) : relatedAnime.loading === true ? (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      ) : (
        <section className=" mt-10 flex flex-col">
          <h1 className=" font-bold md:text-xl">Anime related to {anime_id}</h1>
          <div className="flex flex-row pb-5 overflow-hidden overflow-x-scroll gap-5 scrollbar-custom"></div>
        </section>
      )}
    </>
  );
}
