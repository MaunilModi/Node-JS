const express = require("express");
const urlRouter = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const PORT = 8001;
const app = express();
const URL = require("./models/url");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Connect MongoDB")
);

app.use(express.json());
app.use("/url", urlRouter);

app.get("/:shorId", async (req, res) => {
  const shortId = req.params.shorId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
