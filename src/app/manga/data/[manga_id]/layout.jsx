import React from "react";

export async function generateMetadata({ params }, parent) {
  const id = params.manga_id;

  const res = await fetch(`https://api.jikan.moe/v4/manga/${id}/full`);
  const result = await res.json();

  return {
    title: `${result.data.title} - Clone-Anime`,
    description: `${result.data.title} Infos are displayed here .`,
  };
}

export default function layout({ children }) {
  return <div>{children}</div>;
}
