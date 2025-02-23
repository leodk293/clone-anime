"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var animeList = ["Dragon ball", "Bleach", "Dororo", "Yu-Gi-Oh", "Saint Seiya", "Kimetsu No Yaiba (Demon Slayer)", "Kusuriya no Hitorigoto (The Apothecary Diaries)", "Parasyte", "Dr.Stone", "Sousou no Frieren"];

var getPopularAnime = function getPopularAnime() {
  var popular, popularResult, i;
  return regeneratorRuntime.async(function getPopularAnime$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity"));

        case 2:
          popular = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(popular.json());

        case 5:
          popularResult = _context.sent;

          for (i = 0; i < popularResult.data.length; i++) {
            animeList.push(popularResult.data[i].title);
          }

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

getPopularAnime();
var _default = animeList;
exports["default"] = _default;