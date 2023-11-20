
import React from "react";

const Task = ({ text, completed, onDragStart, onDoubleClick, onContextMenu, onToggleCheckbox }) => {
  return (
    <div
      className={`task ${completed ? "completed" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e)}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      style={{ display: "flex", alignItems: "center", minHeight: "15px", padding:"0" }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggleCheckbox}
        style={{ transform: "scale(0.8)", width: "10%" }}
      />
      <span style={{ width: "95%" }}>{text}</span>
    </div>
  );
};

export default Task;
