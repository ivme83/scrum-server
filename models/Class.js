const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  class_code: {
    type: String,
    require: true
  },
  students: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Student model
      ref: "Student"
    }
  ]
});

module.exports = mongoose.model("Class", ClassSchema);
