const router = require("express").Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// CREATE task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      completed: false,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// UPDATE task completion
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        completed: req.body.completed,
      },
      {
        new: true,
      }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;