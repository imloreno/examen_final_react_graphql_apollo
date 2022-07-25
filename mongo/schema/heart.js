const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const heartSchema = new Schema({
  idUser: String,
  idPost: String,
});

const Heart = mongoose.model("Heart", heartSchema);

module.exports = Heart;
