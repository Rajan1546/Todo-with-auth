// todo.js

const router = require("express").Router();
//const Task = require("../models/task");  Import your Task model

router.post("/", async (req, res) => {
  try {
    console.log("hello")
    // Assuming you have a Task model defined, create a task like this:
    // const task = new Task({
    //   task: req.body.task,
    //   dueDate: req.body.dueDate,
    // });
    console.log("hello Rajan")
    // Save the task to the database
    await task.save();

    res.status(201).send({ message: "Task Created Successfully" });
  } catch (error) {
    console.log("hello Rajan Dubey")
    res.status(500).send({ message: "Internal server error" });
  }
});

// Add more task-related routes as needed

module.exports = router;
