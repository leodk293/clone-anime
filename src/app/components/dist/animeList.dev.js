"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var animeList = []; // const popular = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity");
// const popularResult = await popular.json();
// const top = await fetch("https://api.jikan.moe/v4/top/anime");
// const topResult = await top.json();

function getAnime(api) {
  var response, result, i;
  return regeneratorRuntime.async(function getAnime$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(api));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          result = _context.sent;

          for (i = 0; i < result.data.length; i++) {
            animeList.push(result.data[i].title);
          }

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

getAnime("https://api.jikan.moe/v4/top/anime?filter=bypopularity"); //setTimeout(getAnime(`https://api.jikan.moe/v4/top/anime?filter=upcoming`), 1500)
//getAnime(`https://api.jikan.moe/v4/top/anime`);
// for (let i = 0; i < popularResult.data.length; i++) {
//     animeList.push(popularResult.data[i].title);
// }
// for (let i = 0; i < topResult.data.length; i++) {
//     animeList.push(topResult.data[i].title);
// }

var _default = animeList;
exports["default"] = _default;