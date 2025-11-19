const axios = require("axios");
const xml2js = require("xml2js");

async function scrapeEventbriteCincinnati() {
  try {
    const url = "https://www.eventbrite.com/d/oh--cincinnati/events--this-weekend/?format=rss";
    const res = await axios.get(url);
    const xml = res.data;

    const parsed = await xml2js.parseStringPromise(xml);
    const items = parsed.rss.channel[0].item || [];

    return items.map(it => ({
      title: it.title?.[0] || "",
      date: it.pubDate?.[0] || "",
      location: it["ev:location"]?.[0] || "Cincinnati",
      url: it.link?.[0],
      category: "events",
      source: "eventbrite"
    }));
  } catch (e) {
    console.error("Eventbrite error:", e.message);
    return [];
  }
}

module.exports = scrapeEventbriteCincinnati;
