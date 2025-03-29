import React from 'react'

export async function generateMetadata({ params }, parent) {
  const id = params.character_id;

  const res = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`);
  const result = await res.json();

  return {
      title: `${result.data.name} - Clone-Anime`,
      description: `${result.data.name} Infos are displayed here .`,
  };
}

export default function layout({children}) {
  return (
    <div>{children}</div>
  )
}
