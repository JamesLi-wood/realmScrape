const { MongoClient } = require("mongodb");
let connection;

module.exports = {
  connectToDb: (callback) => {
    MongoClient.connect("mongodb://127.0.0.1:27017/realmScrape")
      .then((client) => {
        connection = client.db();
        return callback();
      })
      .catch((err) => {
        return callback(err);
      });
  },
  getDb: () => connection,
};
