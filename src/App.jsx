import React, { useState, useEffect } from "react";
import "./App.css";

const TodoApp = () => {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskNotes, setTaskNotes] = useState("");
  const [taskComment, setTaskComment] = useState("");

  // State for theme
  const [theme, setTheme] = useState("dark");

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Add Task
  const addTask = () => {
    if (taskName.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: taskName,
        notes: taskNotes,
        comment: taskComment,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskName("");
      setTaskNotes("");
      setTaskComment("");
    }
  };

  // Toggle Task Completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete Task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="todo-container">
      <h1>To-Do List with Notes and Comments</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
      <div className="task-inputs">
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Enter task notes"
          value={taskNotes}
          onChange={(e) => setTaskNotes(e.target.value)}
        />
        <textarea
          placeholder="Enter task comments"
          value={taskComment}
          onChange={(e) => setTaskComment(e.target.value)}
        />
        <button className="add-task-button" onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <span>{task.name}</span>
            </div>
            <p>
              <strong>Notes:</strong> {task.notes}
            </p>
            <p>
              <strong>Comments:</strong> {task.comment}
            </p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
