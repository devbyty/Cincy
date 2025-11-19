const axios = require("axios");
const ical = require("ical");

async function scrapeParks() {
  try {
    const url = "https://www.cincinnati-oh.gov/cincyparks/events/ical/";
    const res = await axios.get(url);
    const events = ical.parseICS(res.data);

    return Object.values(events)
      .filter(e => e.type === "VEVENT")
      .map(e => ({
        title: e.summary,
        date: e.start,
        location: e.location || "Cincinnati Park",
        url: e.url || "",
        category: "parks",
        source: "parks"
      }));

  } catch (e) {
    console.error("Parks error:", e.message);
    return [];
  }
}

module.exports = scrapeParks;
