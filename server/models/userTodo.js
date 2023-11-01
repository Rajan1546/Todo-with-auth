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
    enum: ["Pending", "Completed"], // You can add more status options
    default: "Pending", // Default status when creating a task
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
