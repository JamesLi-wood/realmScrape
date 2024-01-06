const express = require("express");
const player = require("./scrape");
const { connectToDb, getDb } = require("./mongo");
const app = express();
const port = 5000;

async function getCharacter() {
  return player.getPlayer().then((data) => {
    return data;
  });
}

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

// setTimeout(async () => {
//   await db.collection("characters").insertMany(await getCharacter());
//   console.log("added");
// }, 100);

// setInterval(async () => {
//   await db.collection("characters").deleteOne();
//   console.log("deleted");
// }, 100);

setInterval(async () => {
  const websiteRecent = await getCharacter();
  const dbRecent = await dbLowestHighest("characters", { deathDate: -1 });

  if (
    websiteRecent.deathDate !== dbRecent.deathDate &&
    websiteRecent.name !== "Private"
  ) {
    await db.collection("characters").deleteOne({
      _id: await dbLowestHighest("characters", { deathDate: 1 }).then(
        (data) => {
          return data._id;
        }
      ),
    });
    await db.collection("characters").insertOne(websiteRecent);

    const lowestFame = await dbLowestHighest("topDeaths", { baseFame: 1 });
    if (websiteRecent.baseFame > lowestFame.baseFame) {
      await db
        .collection("topDeaths")
        .updateOne({ _id: lowestFame._id }, [{ $set: websiteRecent }]);

      console.log("A new character has made it in the topDeaths leaderboard!");
    }

    console.log("A character has been added to the graveyard!");
  } else {
    console.log("Nothing happened!");
  }
}, 5000);

app.get("/", (req, res) => {
  res.end("Welcome to realm scrape!");
});

app.get("/graveyard", async (req, res) => {
  const characters = [];
  await db
    .collection("characters")
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
