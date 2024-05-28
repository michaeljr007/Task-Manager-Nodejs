const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json({ task });
};

const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ task });
};

const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  res.status(200).json({ task, completed: true, msg: "Task deleted" });
};

const deleteAllTasks = async (req, res) => {
  await Task.deleteMany();
  res.status(200).json({ completed: true, msg: "All Tasks Deleted" });
};

module.exports = {
  getAllTasks,
  deleteAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
