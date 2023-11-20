
import React from "react";
import Task from "./Task";

const TodoBoard = ({
  tasks,
  lane,
  onDragOver,
  onDrop,
  onDoubleClick,
  onContextMenu,
  onDragStart,
  onEditTask,
  onDeleteTask,
  onToggleCheckbox,
}) => {
  return (
    <div
      className="swim-lane"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, lane)}
    >
      <h3 className="heading">{lane.toUpperCase()}</h3>
      {tasks.map((task) => (
        <div key={task.id} className="task-container">
          <Task
            text={task.text}
            completed={task.completed}
            onDragStart={(e) => onDragStart(e, task.id)}
            onDoubleClick={() => onDoubleClick(task.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              onContextMenu(task.id);
            }}
            onToggleCheckbox={() => onToggleCheckbox(task.id)}
          />
          <div className="task-icons">
            <span onClick={() => onEditTask(task.id)}>
              <img src="/images/edit.png" alt="Edit" id="edit-img" />
            </span>
            <span onClick={() => onDeleteTask(task.id)}>
              <img src="/images/delete.png" alt="Delete" id="delete-img" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoBoard;
