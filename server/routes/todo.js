// todo.js

const router = require("express").Router();
const Task = require("../models/userTodo"); //  Import your Task model

router.post("/", async (req, res) => {
  try {
    // Assuming you have a Task model defined, create a task like this:
    const task = new Task({
      task: req.body.task,
      dueDate: req.body.dueDate,
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

// Add more task-related routes as needed

module.exports = router;
