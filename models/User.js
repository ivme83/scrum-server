const mongoose  = require("mongoose");
const Schema    = mongoose.Schema;
const db        = require("./index");

const UserSchema = new Schema({
  fbuid: {
    type: String,
    unique: true,
    require: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
