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

async function dbRecentOldest(position) {
  // position can be -1 (recent) or 1 (oldest).
  return await db
    .collection("characters")
    .findOne({}, { sort: { deathDate: position } })
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
//   await db.collection("characters").insertMany(await getCharacterInfo());
//   console.log("added");
// }, 100);

// setInterval(async () => {
//   await db.collection("characters").deleteOne();
//   console.log("deleted");
// }, 100);

setInterval(async () => {
  const websiteRecent = await getCharacter();
  const dbRecent = await dbRecentOldest(-1);

  if (
    websiteRecent.deathDate !== dbRecent.deathDate &&
    websiteRecent.name !== "Private"
  ) {
    await db.collection("characters").deleteOne({
      _id: await dbRecentOldest(1).then((data) => {
        return data._id;
      }),
    });
    await db.collection("characters").insertOne(websiteRecent);

    console.log("replaced");
  } else {
    console.log("nothing happened");
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
