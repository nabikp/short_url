const shortid = require("shortid");
//importing the database too
const URL = require("../models/url");
async function handleGenerateNewShortURL(req, res) {
  //redirect url will be given by the user
  const body = req.body;
  //user will parse one new original url in the body
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url, //user will vive this
    visitedHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  //short id se db mein query kiya kiya aur phir jo bhi uski visit history hai wo send kr diya
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
