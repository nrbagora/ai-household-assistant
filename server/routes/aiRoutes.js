const router = require("express").Router();
const Task = require("../models/Task");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        type: "error",
        message: "Task cannot be empty",
      });
    }

    const text = message.trim();
    const lower = text.toLowerCase();

    let category = "General";

    if (
      lower.includes("milk") ||
      lower.includes("grocery") ||
      lower.includes("groceries") ||
      lower.includes("food")
    ) {
      category = "Groceries";
    } else if (
      lower.includes("laundry") ||
      lower.includes("clean") ||
      lower.includes("dishes")
    ) {
      category = "Cleaning";
    } else if (
      lower.includes("rent") ||
      lower.includes("bill") ||
      lower.includes("electricity")
    ) {
      category = "Bills";
    }

    let dueDate = null;

    if (lower.includes("tomorrow")) {
      dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 1);
    }

    const task = await Task.create({
      title: text,
      completed: false,
      category,
      dueDate,
    });

    res.json({
      type: "task",
      task,
    });
  } catch (err) {
    console.error("AI route error:", err);

    res.status(500).json({
      type: "error",
      message: err.message,
    });
  }
});

module.exports = router;