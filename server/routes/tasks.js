const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask).delete(deleteAllTasks);
router.route("/:id").patch(updateTask).delete(deleteTask);

module.exports = router;
