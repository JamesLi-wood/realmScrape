const { getTopCharacters } = require("./utils/scrape");
const { connectToDb, checkNewEntries, dbGetSorted } = require("./utils/mongo");
const { ping } = require("./utils/ping");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

/* Pings server every 14 minutes so the server 
   doesn't go inactive on Render. */
ping();

connectToDb();

/* Sets an interval every 10 seconds to check if
   a new death has been posted. */
checkNewEntries();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use(cors()); // Enables CORS.

app.get("/", (req, res) => {
  res.end("Welcome to realm scrape!");
});

app.get("/recentDeaths", async (req, res) => {
  res.send(await dbGetSorted("recentDeaths", { deathDate: -1 }));
});

app.get("/topDeaths", async (req, res) => {
  res.send(await dbGetSorted("topDeaths", { baseFame: -1 }));
});

app.get("/topCharacters", async (req, res) => {
  res.send(await getTopCharacters());
});
