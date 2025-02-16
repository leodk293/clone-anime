const animeList = [
    "Dragon ball",
    "Bleach",
    "Naruto",
    "Dororo",
    "Yu-Gi-Oh",
    "Death Note",
    "The Apothecary Diaries"
]

const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity");
const result = await response.json();

for(let i = 0; i<result.data.length; i++){
    animeList.push(result.data[i].title);
}

export default animeList;