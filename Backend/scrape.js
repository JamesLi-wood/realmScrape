const cheerio = require("cheerio");
const axios = require("axios");

async function recentDeath() {
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

  // Gets all text based information.
  const info = [];
  htmlElement.each((idx, data) => {
    info.push($(data).text());
  });

  // Gets the position of the character sprite.
  let characterSprite = htmlElement
    .eq(0)
    .children()
    .css("background-position")
    .split(" ");
  characterSprite[1] = `${parseInt(characterSprite[1]) + 250}px`;
  characterSprite = characterSprite.join(" ");

  // Gets the position of the equipment sprites.
  const equipmentSprites = [];
  htmlElement
    .eq(5)
    .children()
    .each((idx, data) => {
      equipmentSprites.push(
        $(data).children().children().css("background-position")
      );
    });

  const character = {
    sprite: characterSprite,
    name: info[1],
    deathDate: info[2],
    baseFame: Number(info[3]),
    totalFame: Number(info[4]),
    equipments: equipmentSprites,
    stats: info[6],
    diedTo: info[7],
  };

  return character;
}

async function topCharacters() {
  const axiosResponse = await axios.request({
    method: "GET",
    url: "https://www.realmeye.com/top-characters-of-guild/FriendSHlP",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
  const $ = cheerio.load(axiosResponse.data);
  const htmlElement = $("table").eq(1).find("tbody").children(":lt(10)");
  const leaderboard = [];

  htmlElement.each((idx, child) => {
    // Gets all text based information.
    const info = [];
    $(child)
      .children()
      .each((idx, data) => {
        info.push($(data).text());
      });

    // Gets the position of the character sprite.
    let characterSprite = "";
    $(child)
      .children()
      .eq(1)
      .children()
      .each(function (i, data) {
        characterSprite = $(data).css("background-position");
        characterSprite = characterSprite.split(" ");
        characterSprite[1] = `${parseInt(characterSprite[1]) + 250}px`;
        characterSprite = characterSprite.join(" ");
      });

    // Gets the position of the equipment sprites.
    const equipmentSprite = [];
    $(child)
      .children()
      .eq(5)
      .children()
      .each(function (i, data) {
        equipmentSprite.push(
          $(data).children().children().css("background-position")
        );
      });

    const character = {
      sprite: characterSprite,
      name: info[2],
      baseFame: Number(info[3]),
      class: info[4],
      equipments: equipmentSprite,
    };

    leaderboard.push(character);
  });

  return leaderboard;
}

module.exports = {
  getRecentDeath: recentDeath,
  getTopCharacters: topCharacters,
};
