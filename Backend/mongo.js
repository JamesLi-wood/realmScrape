const { MongoClient } = require("mongodb");

let connection;
module.exports = {
  connectToDb: (callback) => {
    MongoClient.connect(process.env.URI)
      .then((client) => {
        connection = client.db("websiteScrape");
        return callback();
      })
      .catch((err) => {
        console.log(`Connection Failed. ${err}`);
        return callback(err);
      });
  },
  getDb: () => connection,
};
