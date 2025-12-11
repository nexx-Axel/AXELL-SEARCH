const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const db = [
  {
    title: "YouTube",
    url: "https://youtube.com",
    description: "Video izleme platformu."
  },
  {
    title: "Wikipedia",
    url: "https://wikipedia.org",
    description: "Özgür ansiklopedi."
  },
  {
    title: "GitHub",
    url: "https://github.com",
    description: "Kod depolama ve işbirliği platformu."
  }
];

app.get("/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";

  const results = db.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );

  res.json({ results });
});

app.listen(3000, () => {
  console.log("Mini Google çalışıyor: http://localhost:3000");
});
