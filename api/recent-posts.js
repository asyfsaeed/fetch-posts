import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "https://ix.cnn.io/data/truth-social/truth_archive.json"
    );

    const data = await response.json();

    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

    const recentPosts = data.filter(post =>
      new Date(post.created_at).getTime() > tenMinutesAgo
    );

    res.json(recentPosts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

