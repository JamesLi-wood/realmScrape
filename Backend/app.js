const webScrape = require("./scrape");
const { connectToDb, getDb } = require("./mongo");
const { ping } = require("./ping");
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
/**
 * @param {Object} query
 * Query value can either be -1 or 1.
 */
async function dbLowestHighest(collection, query) {
  return await db
    .collection(collection)
    .findOne({}, { sort: query })
    .then((data) => {
      return data;
    });
}

// Get database connection.
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
    db = getDb();
  }
});

ping();

setInterval(async () => {
  const websiteRecent = await webScrape.getRecentDeath();
  const dbRecent = await dbLowestHighest("recentDeaths", { deathDate: -1 });

  if (
    websiteRecent.deathDate !== dbRecent.deathDate &&
    websiteRecent.name !== "Private"
  ) {
    const lowestFame = await dbLowestHighest("topDeaths", { baseFame: 1 });
    if (websiteRecent.baseFame > lowestFame.baseFame) {
      await db
        .collection("topDeaths")
        .updateOne({ _id: lowestFame._id }, { $set: websiteRecent });
      console.log("A new character has made it in the topDeaths leaderboard!");
    }

    await db.collection("recentDeaths").deleteOne({
      _id: await dbLowestHighest("recentDeaths", { deathDate: 1 }).then(
        (data) => {
          return data._id;
        }
      ),
    });
    await db.collection("recentDeaths").insertOne(websiteRecent);
    console.log("A character has been added to the graveyard!");
  }
}, 10000);

app.use(cors());

app.get("/", (req, res) => {
  res.end("Welcome to realm scrape!");
});

app.get("/recentDeaths", async (req, res) => {
  const characters = [];
  await db
    .collection("recentDeaths")
    .find()
    .sort({ deathDate: -1 })
    .forEach((chars) => {
      characters.push(chars);
    })
    .then(() => {
      res.send(characters);
    });
});

app.get("/topDeaths", async (req, res) => {
  const characters = [];
  await db
    .collection("topDeaths")
    .find()
    .sort({ baseFame: -1 })
    .forEach((chars) => {
      characters.push(chars);
    })
    .then(() => {
      res.send(characters);
    });
});

app.get("/topCharacters", async (req, res) => {
  res.send(await webScrape.getTopCharacters());
});
