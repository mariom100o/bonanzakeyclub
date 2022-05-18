import React, { useEffect, useRef } from "react";

const Draggable = ({ children }) => {
  return (
    <>
      <div
        className="members-container"
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        {children.map((child) => {
          console.log(child);
          return child;
        })}
      </div>
    </>
  );
};

export default Draggable;
