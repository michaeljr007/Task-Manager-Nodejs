const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Name field cannot be empty"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
