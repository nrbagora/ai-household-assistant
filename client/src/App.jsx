import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5001/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setError("Could not load tasks. Make sure backend is running.");
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5001/ai", {
        message: message.trim(),
      });

      console.log("AI RESPONSE:", res.data);

      setMessage("");
      await fetchTasks();
    } catch (err) {
      console.error("SEND ERROR:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (task) => {
    await axios.put(`http://localhost:5001/tasks/${task._id}`, {
      completed: !task.completed,
    });
    await fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5001/tasks/${id}`);
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString();
  };

  const TaskCard = ({ task, completed = false }) => (
    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task)}
        />

        <div>
          <p className={completed ? "line-through text-gray-500" : "font-medium"}>
            {task.title}
          </p>

          <div className="flex gap-3 text-xs text-gray-500 mt-1">
            <span>{task.category || "General"}</span>

            {task.dueDate && <span>Due: {formatDate(task.dueDate)}</span>}
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteTask(task._id)}
        className="text-sm text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-8 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">
            AI Household Assistant
          </h1>
          <p className="text-gray-500 mt-2">
            Add household tasks, track completion, and organize your list.
          </p>
        </div>

        <div className="flex gap-3 mb-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Add a task..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Adding..." : "Send"}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500 mb-6">
            {error}
          </p>
        )}

        <div className="grid grid-cols-3 gap-4 mb-10 mt-8">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-2xl font-semibold">{tasks.length}</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-gray-500 text-sm">Active</p>
            <p className="text-2xl font-semibold">{activeTasks.length}</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-2xl font-semibold">{completedTasks.length}</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>

          {activeTasks.length === 0 ? (
            <div className="border border-gray-200 rounded-xl p-6 text-gray-400">
              No active tasks
            </div>
          ) : (
            <div className="space-y-3">
              {activeTasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Completed</h2>

          {completedTasks.length === 0 ? (
            <div className="border border-gray-200 rounded-xl p-6 text-gray-400">
              No completed tasks
            </div>
          ) : (
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <TaskCard key={task._id} task={task} completed />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}