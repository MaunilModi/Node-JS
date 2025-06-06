const URL = require("../models/url");
const { nanoid } = require("nanoid");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  const shortId = nanoid(8);

  if (!body.url) return res.status(400).json({ error: "URL is required" });

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortId });
  //   return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shorId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
