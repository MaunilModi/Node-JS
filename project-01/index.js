const express = require("express");
const fs = require("fs");
const { json } = require("stream/consumers");
const { default: mongoose, mongo } = require("mongoose");
const { type } = require("os");

const PORT = 8000;
const app = express();

//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error: ", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("user", userSchema);

// Middleware - Pludgin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // console.log('Hello From Middleware 1');
  // // return res.json({msg: 'Hello From Middleware 1'});  // ending request here and return response
  // next(); // my work is done and call next

  fs.appendFile("log.txt", `${Date.now()} : ${req.method}`, (err, result) => {
    next();
  });
});

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});

  const html = `
    <ul>
        ${allDbUsers
          .map((user) => `<li> ${user.firstName} : ${user.email} </li>`)
          .join("")}
    </ul>
    `;
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app.post("/api/users", async (req, res) => {
  // TODO: create new user
  const data = req.body;

  if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.gender ||
    !data.job_title
  ) {
    return res.status(400).json({ msg: "All Fields are req..." });
  }

  const result = await User.create({
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    gender: data.gender,
    jobTitle: data.job_title,
  });

  console.log(result);
  return res.status(201).json({ msg: "User Created" });
});

// for same paths
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user.length === 0)
      return res.status(404).json({ error: `Not Found data with id: ${id}` });

    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ msg: "Success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ msg: "Success" });
  });

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
