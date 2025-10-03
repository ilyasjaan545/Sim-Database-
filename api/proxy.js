export default async function handler(req, res) {
  const { num } = req.query;

  // secret token (hidden, not in frontend)
  const SECRET_TOKEN = process.env.API_SECRET;

  if (!num) {
    return res.status(400).json({ error: "Missing number" });
  }

  try {
    const apiUrl = `https://www.3patticenter.com/famofc/api/database.php?num=${encodeURIComponent(num)}&token=${SECRET_TOKEN}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Server Error" });
  }
}
