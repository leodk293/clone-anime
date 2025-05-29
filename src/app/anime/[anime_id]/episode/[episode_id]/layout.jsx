import React from "react";

export async function generateMetadata({ params }, parent) {
  const episodeNumber = params.episode_id;
  const animeId = params.anime_id;

  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${animeId}/episodes/${episodeNumber}`
  );
  const result = await res.json();

  if (result.data && result.data.title) {
    return {
      title: `${result.data.title} - Clone-Anime`,
    };
  }

  return {
    title: `Undefined - Clone-Anime`,
  };
}

export default function layout({ children }) {
  return <>{children}</>;
}
