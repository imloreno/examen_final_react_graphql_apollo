const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  img: String,
  user: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
