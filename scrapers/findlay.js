const axios = require("axios");
const xml2js = require("xml2js");

async function scrapeFindlay() {
  try {
    const url = "https://www.findlaymarket.org/events?format=rss";
    const res = await axios.get(url);
    const xml = res.data;

    const parsed = await xml2js.parseStringPromise(xml);
    const items = parsed.rss.channel[0].item || [];

    return items.map(it => ({
      title: it.title[0],
      date: it.pubDate[0],
      location: "Findlay Market",
      url: it.link[0],
      category: "markets",
      source: "findlay"
    }));

  } catch (e) {
    console.error("Findlay error:", e.message);
    return [];
  }
}

module.exports = scrapeFindlay;
