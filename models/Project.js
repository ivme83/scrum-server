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
  },
  tasks: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Student model
      ref: "Task"
    }
  ]
});

module.exports = mongoose.model("Project", ProjectSchema);
