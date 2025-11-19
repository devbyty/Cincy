const fs = require("fs");
const scrapeEventbrite = require("./eventbrite");

async function runAll() {
  console.log("Running scrapers...");

  const eb = await scrapeEventbrite();
  console.log("Eventbrite:", eb.length);

  const allEvents = [...eb];

  console.log("TOTAL EVENTS:", allEvents.length);

  fs.writeFileSync("./data/events.json", JSON.stringify(allEvents, null, 2));
}

runAll();
