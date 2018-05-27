const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  user_id: {
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
  ]
});

module.exports = mongoose.model("Teacher", TeacherSchema);
