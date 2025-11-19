const axios = require("axios");
const xml2js = require("xml2js");

async function scrapeEventbriteCincinnati() {
  try {
    const url = "https://www.eventbrite.com/d/oh--cincinnati/events/?format=rss";

    const res = await axios.get(url, {
      headers: {
        // Pretend to be Chrome to bypass Eventbrite blocking bots
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Accept": "application/rss+xml, application/xml, text/xml, */*"
      }
    });

    let xml = res.data;

    // Sanitize invalid XML entities (&)
    xml = xml.replace(/&(?![a-zA-Z]+;)/g, "&amp;");

    const parsed = await xml2js.parseStringPromise(xml);
    const items = parsed.rss.channel[0].item || [];

    return items.map(it => ({
      title: it.title?.[0] || "",
      date: it.pubDate?.[0] || "",
      location: it["ev:location"]?.[0] || "Cincinnati",
      url: it.link?.[0] || "",
      category: "events",
      source: "eventbrite"
    }));
  } catch (e) {
    console.error("Eventbrite error:", e.message);
    return [];
  }
}

module.exports = scrapeEventbriteCincinnati;
