// Task.js
import React from 'react';

const Task = ({ text, onDragStart, onDoubleClick, onContextMenu }) => {
  return (
    <p
      className="task"
      draggable
      onDragStart={onDragStart}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
      {text}
    </p>
  );
};

export default Task;
