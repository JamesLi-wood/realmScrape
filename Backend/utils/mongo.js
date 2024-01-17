const { MongoClient } = require("mongodb");
const { getRecentDeath } = require("./scrape");

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

/**
 * @param {Object} query
 * Query value can either be -1 or 1.
 */
async function dbGetSorted(collection, query) {
  const characters = [];
  await db
    .collection(collection)
    .find()
    .sort(query)
    .forEach((chars) => {
      characters.push(chars);
    });

  return characters;
}

function connectToDb() {
  MongoClient.connect(process.env.URI)
    .then((client) => {
      console.log("Connected to db!");
      db = client.db("websiteScrape");
    })
    .catch((err) => {
      console.log(`Connection Failed. ${err}`);
    });
}

function checkNewEntries() {
  setInterval(async () => {
    const websiteRecent = await getRecentDeath();
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
        console.log(
          "A new character has made it in the topDeaths leaderboard!"
        );
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
}

let db;
module.exports = {
  connectToDb: connectToDb,
  checkNewEntries: checkNewEntries,
  dbGetSorted: dbGetSorted,
};
