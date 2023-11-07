// todo.js

const router = require("express").Router();
const Task = require("../models/userTodo"); //  Import your Task model
const authToken = require('../middlewares/token');

router.post("/", async (req, res) => {
  try {
    // Assuming you have a Task model defined, create a task like this:
    const task = new Task({
      task: req.body.task,
      dueDate: req.body.dueDate,
      userId: req.userId,
    });
    console.log("Received POST request");
    console.log("Request body:", req.body);

    // Save the task to the database
    await task.save();

    res.status(201).send({ message: "Task Created Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Get all tasks
router.get("/",authToken, async (req, res) => {
  try {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    const tasks = await Task.find({ userId: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Get a specific task by ID
router.get("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Update a task by ID
router.put("/:taskId", authToken ,async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        task: req.body.task,
        dueDate: req.body.dueDate,
        status: req.body.status, // Update the status if needed
      },
      { new: true } // Return the updated task
    );
    if (!updatedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Delete all tasks
router.delete("/deleteall", async (req, res) => {
  try {
    console.error("Error deleting all tasks");
    await Task.deleteMany({});
    res.status(200).send({ message: "All tasks deleted successfully" });
  } catch (error) {
    console.log("Error deleting all tasks:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Delete a task by ID
router.delete("/:taskId", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    if (!deletedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});



// Filter tasks by status
router.get("/filter/:status", async (req, res) => {
  try {
    const status = req.params.status; // "pending" or "completed"
    const tasks = await Task.find({ status });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});



module.exports = router;
