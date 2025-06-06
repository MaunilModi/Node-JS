const express = require("express");
const userRouter = require("./routes/user");
const { connectMongoDB } = require("./connections");
const { logReqRes } = require("./middlewares/index");

const PORT = 8000;
const app = express();

//connection
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1").then(() =>
  console.log("MongoDB Connected")
);

// Middleware - Pludgin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
