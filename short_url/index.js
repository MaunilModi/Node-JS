const express = require("express");
const path = require("path");
const urlRouter = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const staticRoute = require("./routes/staticRouter");
const PORT = 8001;
const app = express();
const URL = require("./models/url");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Connect MongoDB")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/url", urlRouter);
app.use("/", staticRoute);

app.get("/url/:shorId", async (req, res) => {
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
