const animeList = [
    "Dragon ball",
    "Bleach",
    "Dororo",
    "Yu-Gi-Oh",
    "Saint Seiya",
    "Kimetsu No Yaiba (Demon Slayer)",
    "Kusuriya no Hitorigoto (The Apothecary Diaries)",
    "Parasyte",
    "Dr.Stone",
    "Sousou no Frieren",

]

const popular = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity");
const popularResult = await popular.json();


for (let i = 0; i < popularResult.data.length; i++) {
    animeList.push(popularResult.data[i].title);
}

export default animeList;