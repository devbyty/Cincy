const axios = require("axios");

async function scrapeRhinegeist() {
  try {
    const url = "https://rhinegeist.com/wp-json/wp/v2/event?per_page=50";
    const res = await axios.get(url);
    const data = res.data;

    return data.map(e => ({
      title: e.title.rendered,
      date: e.acf?.event_date || "",
      location: "Rhinegeist Brewery",
      url: e.link,
      category: "breweries",
      source: "rhinegeist"
    }));
  } catch (e) {
    console.error("Rhinegeist error:", e.message);
    return [];
  }
}

module.exports = scrapeRhinegeist;
