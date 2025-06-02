const User = require("../models/user");

async function handleGellAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);

  if (user.length === 0)
    return res.status(404).json({ error: `Not Found data with id: ${id}` });

  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ msg: "Success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ msg: "Success" });
}

async function handleCreateNewUser(req, res) {
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
  return res.status(201).json({ msg: "User Created", id: result._id });
}

module.exports = {
  handleGellAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
