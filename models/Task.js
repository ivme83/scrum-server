const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  due_date: {
    type: Date
  },
  assign_to: {
    ref: "User",
    type: String
  },
  finished: {
      type: Boolean,
      default: false
  }
});

module.exports = mongoose.model("Task", TaskSchema);
