import React, { useState, useEffect } from "react";
import "./dashboard.css";
import TodoBoard from "../TodoBoard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Load user data from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const initials = storedUserData.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  // Load tasks from localStorage or use the initialTasks if not present
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  const initialTasks = storedTasks || {
    todo: [
      { id: 1, text: "Code" },
      { id: 2, text: "Eat" },
      { id: 3, text: "Sleep" },
    ],
    List1: [],
    List2: [],
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [newListName, setNewListName] = useState("");
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = (e, lane) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [lane]: [...prevTasks[lane], { id: Date.now(), text: newTask }],
      }));
      setNewTask("");
    }
  };

  const handleEditTask = (id) => {
    const updatedText = prompt(
      "Edit task:",
      tasks[getLane(id)].find((task) => task.id === id).text
    );
    if (updatedText !== null) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [getLane(id)]: prevTasks[getLane(id)].map((task) =>
          task.id === id ? { ...task, text: updatedText } : task
        ),
      }));
    }
  };

  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm("Delete this task?");
    if (confirmDelete) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [getLane(id)]: prevTasks[getLane(id)].filter((task) => task.id !== id),
      }));
    }
  };

  const handleAddList = () => {
    if (newListName.trim() !== "") {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [newListName]: [],
      }));
      setNewListName("");
    }
  };

  const getLane = (taskId) => {
    return Object.keys(tasks).find((lane) =>
      tasks[lane].some((task) => task.id === taskId)
    );
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id.toString());
    setDraggedTaskId(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetLane) => {
    const taskId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const updatedTasks = { ...tasks };

    const sourceLane = Object.keys(updatedTasks).find((lane) =>
      updatedTasks[lane].some((task) => task.id === taskId)
    );

    updatedTasks[sourceLane] = updatedTasks[sourceLane].filter(
      (task) => task.id !== taskId
    );

    updatedTasks[targetLane] = [
      ...updatedTasks[targetLane],
      {
        id: taskId,
        text: tasks[sourceLane].find((task) => task.id === taskId).text,
      },
    ];

    setTasks(updatedTasks);
    setDraggedTaskId(null);
  };

  const handleToggleCheckbox = (taskId) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [getLane(taskId)]: prevTasks[getLane(taskId)].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  // Update tasks in localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleSignout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="App">
      <div className="nav">
        <div className="profileInfo">
          <p style={{ fontWeight: "bold", color: "white", fontSize: "larger" }}>
            Welcome, {storedUserData.name}
          </p>
        </div>
        <div id="right">
          <div className="photo">{initials}</div>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleSignout}>Signout</button>
        </div>
      </div>
      <div className="board">
        <div className="inputs">
          <form onSubmit={(e) => addTask(e, "todo")}>
            <input
              type="text"
              placeholder="  ADD TO LIST 1 ..."
              value={newTask}
              onChange={handleInputChange}
              id="todo-input"
            />
            <button type="submit" id="add-btn">
              {" "}
              Add Task{" "}
            </button>
          </form>
          <div>
            <input
              type="text"
              placeholder="ENTER NEW LIST NAME..."
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              id="todo-input"
            />
            <button onClick={handleAddList} id="add-btn">
              Add List Column
            </button>
          </div>
        </div>

        <div className="lanes">
          {Object.keys(tasks).map((lane) => (
            <TodoBoard
              key={lane}
              tasks={tasks[lane]}
              lane={lane}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, lane)}
              onDoubleClick={handleEditTask}
              onContextMenu={handleDeleteTask}
              onDragStart={handleDragStart}
              draggedTaskId={draggedTaskId}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onToggleCheckbox={handleToggleCheckbox}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
