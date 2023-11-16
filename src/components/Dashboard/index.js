import React, { useState } from "react";
import "./dashboard.css";
import TodoBoard from "../TodoBoard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const initialTasks = {
    todo: [
      { id: 1, text: "Code" },
      { id: 2, text: "Eat" },
      { id: 3, text: "Sleep" },
    ],
    List2: [],
    List3: [],
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
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

  // Helper function to get the lane of a task
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

    // Find the dragged task in the source lane
    const sourceLane = Object.keys(updatedTasks).find((lane) =>
      updatedTasks[lane].some((task) => task.id === taskId)
    );

    // Remove the task from the source lane
    updatedTasks[sourceLane] = updatedTasks[sourceLane].filter(
      (task) => task.id !== taskId
    );

    // Add the task to the new lane
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

  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirect to the landing page on logout
    navigate("/");
  };

  const handleSignout = () => {
    // Clear all data from localStorage to sign out
    localStorage.clear();
    navigate("/");
  };

  // Retrieve user data from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  //Profile picture===== Extract and format the initials from the user's name
  const initials = storedUserData.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div className="App">
      <div className="subcontainer">
        <div className="profileInfo">
          <p style={{ fontWeight: "bold", color: "white", fontSize:"larger" }}>
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
            Add{" "}
          </button>
        </form>

        <div className="lanes">
          <TodoBoard
            tasks={tasks.todo}
            lane="List 1"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "todo")}
            onDoubleClick={handleEditTask}
            onContextMenu={handleDeleteTask}
            onDragStart={handleDragStart}
            draggedTaskId={draggedTaskId}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <TodoBoard
            tasks={tasks.List2}
            lane="List 2"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "List2")}
            onDoubleClick={handleEditTask}
            onContextMenu={handleDeleteTask}
            onDragStart={handleDragStart}
            draggedTaskId={draggedTaskId}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />

          <TodoBoard
            tasks={tasks.List3}
            lane="List 3"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "List3")}
            onDoubleClick={handleEditTask}
            onContextMenu={handleDeleteTask}
            onDragStart={handleDragStart}
            draggedTaskId={draggedTaskId}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
