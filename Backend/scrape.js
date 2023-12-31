const cheerio = require("cheerio");
const axios = require("axios");

async function scrape() {
  const axiosResponse = await axios.request({
    method: "GET",
    url: "https://www.realmeye.com/recent-deaths-in-guild/FriendSHlP",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
  const $ = cheerio.load(axiosResponse.data);
  const htmlElement = $("table")
    .eq(1)
    .find("tbody")
    .children()
    .first()
    .children();

  const info = [];
  htmlElement.each((idx, data) => {
    info.push($(data).text());
  });

  let characterSprite = htmlElement
    .eq(0)
    .children()
    .css("background-position")
    .split(" ");
  characterSprite[1] = `${parseInt(characterSprite[1]) + 250}px`;
  characterSprite = characterSprite.join(" ");

  const equipmentSprite = [];
  htmlElement
    .eq(5)
    .children()
    .each((idx, data) => {
      equipmentSprite.push(
        $(data).children().children().css("background-position")
      );
    });

  const character = {
    sprite: characterSprite,
    name: info[1],
    deathDate: info[2],
    baseFame: info[3],
    totalFame: info[4],
    equipment: equipmentSprite,
    stats: info[6],
    diedTo: info[7],
  };

  return character;
}

module.exports = {
  getPlayer: scrape,
};
