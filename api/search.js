// api/search.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query required" });
  }

  const bingApiKey = process.env.BING_SEARCH_KEY; // Vercel Env Variable
  const endpoint = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}&count=5`;

  try {
    const response = await fetch(endpoint, {
      headers: { "Ocp-Apim-Subscription-Key": bingApiKey }
    });

    const data = await response.json();

    // Web sonuçlarını al
    const results = (data.webPages?.value || []).map(item => ({
      title: item.name,
      url: item.url,
      snippet: item.snippet
    }));

    res.status(200).json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bing API error" });
  }
}
