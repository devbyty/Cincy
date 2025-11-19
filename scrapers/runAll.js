const fs = require("fs");

const scrapeRhinegeist = require("./rhinegeist");
const scrapeCityBeat = require("./citybeat");
const scrapeFindlay = require("./findlay");
const scrapeParks = require("./parks");
const scrapeVisitCincy = require("./visitcincy");
const scrapeEventbrite = require("./eventbrite");

async function runAll() {
  console.log("Running scrapers...");

  const rg = await scrapeRhinegeist();
  console.log("Rhinegeist:", rg.length);

  const cb = await scrapeCityBeat();
  console.log("CityBeat:", cb.length);

  const fm = await scrapeFindlay();
  console.log("Findlay:", fm.length);

  const pk = await scrapeParks();
  console.log("Parks:", pk.length);

  const vc = await scrapeVisitCincy();
  console.log("VisitCincy:", vc.length);

  const allEvents = [...rg, ...cb, ...fm, ...pk, ...vc];

  console.log("TOTAL EVENTS:", allEvents.length);

  fs.writeFileSync("./data/events.json", JSON.stringify(allEvents, null, 2));
}

runAll();
