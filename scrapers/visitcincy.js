const axios = require("axios");
const xml2js = require("xml2js");

async function scrapeVisitCincy() {
  try {
    const url = "https://www.visitcincy.com/events/?format=rss";
    const res = await axios.get(url);
    const xml = res.data;

    const parsed = await xml2js.parseStringPromise(xml);

    const items = parsed.rss.channel[0].item || [];

    return items.map(it => ({
      title: it.title[0],
      date: it.pubDate[0],
      location: "Cincinnati",
      url: it.link[0],
      category: "events",
      source: "visitcincy"
    }));
  } catch (err) {
    console.error("VisitCincy error:", err.message);
    return [];
  }
}

module.exports = scrapeVisitCincy;
