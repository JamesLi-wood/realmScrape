const express = require("express");
const player = require("./scrape.js");
const app = express();
const port = 5000;

async function getCharacter() {
  return player.getPlayer().then((data) => {
    return data;
  });
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.end("Welcome to realm scrape!");
});

app.get("/death", async (req, res) => {
  res.send(await getCharacter());
});
