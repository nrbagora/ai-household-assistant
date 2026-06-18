require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const aiRoutes = require("./routes/aiRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/ai", aiRoutes);
app.use("/tasks", taskRoutes);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.get("/", (req, res) => {
  res.json({
    message: "AI Household Assistant API is running!"
  });
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});