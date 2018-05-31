const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  user: {
    ref: "User",
    type: String,
    unique: true,
    require: true
  },
  classes: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Class model
      ref: "Class"
    }
  ],
  projects: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Project model
      ref: "Project"
    }
  ]
});

module.exports = mongoose.model("Student", StudentSchema);
