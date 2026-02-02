export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://ix.cnn.io/data/truth-social/truth_archive.json"
    );

    const data = await response.json();

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    const recentPosts = data.filter((post) => {
      const postDate = new Date(post.created_at);
      return postDate > tenMinutesAgo;
    });

    return res.status(200).json(recentPosts);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
}

