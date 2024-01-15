const cron = require("node-cron");

/* Pings the api every 14 minutes so it doesn't
   go inactive on render. */
function ping() {
  console.log("Starting ping on server.");
  cron.schedule("*/14 * * * *", () => {
    fetch(process.env.API)
      .then((res) => {
        if (!response.ok) {
          throw new Error(`Failed to ping server. Status: ${response.status}`);
        }
        console.log("Server pinged successfully!");
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });
  });
}

module.exports = {
  ping: ping,
};
