const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
const PORT = 8000;

//short-url jo niche naam diya hai wo db ka naam hai
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connected!")
);
app.use(express.json());
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  //usko db mein se fetch krna hai usko increment krna hai aur phir hume user ko redirect r dena hai
  const shortId = req.params.shortId;

  //badle mein ye mujhe original entry wapas de dega
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    //update ka karna hai //push krna hai kyuki wo ek array hai
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  //redirecting the user
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
