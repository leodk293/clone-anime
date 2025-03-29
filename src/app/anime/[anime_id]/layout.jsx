import React from "react";

export async function generateMetadata({ params }, parent) {
  const id = params.anime_id;

  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const result = await res.json();

  return {
      title: `${result.data.title} - Clone-Anime`,
      description: `${result.data.title} Infos are displayed here .`,
  };
}

export default function layout({ children }) {
  return <>{children}</>;
}
