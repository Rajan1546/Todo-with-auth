const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],  
    default: "Pending",  
  },
   createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
