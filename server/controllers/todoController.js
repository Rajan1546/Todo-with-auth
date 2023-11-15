const Task = require("../models/userTodo");
const authToken = require('../middlewares/token');

const createTask = async (req, res) => {
  try {
    const task = new Task({
      task: req.body.task,
      dueDate: req.body.dueDate,
      createdBy: req.userId,
    });

    await task.save();

    res.status(201).send({ message: "Task Created Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        task: req.body.task,
        dueDate: req.body.dueDate,
        status: req.body.status,
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany({});
    res.status(200).send({ message: "All tasks deleted successfully" });
  } catch (error) {
    console.log("Error deleting all tasks:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    if (!deletedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const filterTasksByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const tasks = await Task.find({ status });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteAllTasks,
  deleteTaskById,
  filterTasksByStatus,
};
