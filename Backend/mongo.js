const { MongoClient } = require("mongodb");
require("dotenv").config();

let connection;
let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@realmscrape.wmw2fat.mongodb.net/?retryWrites=true&w=majority`;
console.log(process.env.DB_USERNAME);

module.exports = {
  connectToDb: (callback) => {
    MongoClient.connect(uri)
      .then((client) => {
        connection = client.db("websiteScrape");
        return callback();
      })
      .catch((err) => {
        return callback(err);
      });
  },
  getDb: () => connection,
};
