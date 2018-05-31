const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  project_code: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
