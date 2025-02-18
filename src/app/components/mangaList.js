const mangaList = [
    "Dragon ball",
    "Yu-Gi-Oh",
    "Saint Seiya",
    "Nana",
    "Kingdom",
    "Monster",
    "Parasyte"

]

const popular = await fetch("https://api.jikan.moe/v4/top/manga?filter=bypopularity");
const popularResult = await popular.json();


for (let i = 0; i < popularResult.data.length; i++) {
    mangaList.push(popularResult.data[i].title);
}

export default mangaList;