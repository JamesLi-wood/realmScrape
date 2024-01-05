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

module.exports = {
  getPlayer: scrape,
};

// Shortcut to send 30 entries to the database.
async function get30() {
  const axiosResponse = await axios.request({
    method: "GET",
    url: "https://www.realmeye.com/recent-deaths-in-guild/FriendSHlP",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });
  const $ = cheerio.load(axiosResponse.data);
  const element = $("table").eq(1).find("tbody").children(":lt(30)");
  const charList = [];

  element.each(function (i, data) {
    const info = [];
    // Gets all text based information.
    $(data)
      .children()
      .each(function (i, data2) {
        info.push($(data2).text());
      });

    // Gets the position of the character sprite.
    let characterSprite = "";
    $(data)
      .children()
      .eq(0)
      .children()
      .each(function (i, data) {
        characterSprite = $(data).css("background-position");
        characterSprite = characterSprite.split(" ");
        characterSprite[1] = `${parseInt(characterSprite[1]) + 250}px`;
        characterSprite = characterSprite.join(" ");
      });

    // Gets the position of the equipment sprite.
    const equipmentSprite = [];
    $(data)
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
      name: info[1],
      deathDate: info[2],
      baseFame: info[3],
      totalFame: info[4],
      equipments: equipmentSprite,
      stats: info[6],
      diedTo: info[7],
    };

    charList.push(character);
  });

  return charList;
}
