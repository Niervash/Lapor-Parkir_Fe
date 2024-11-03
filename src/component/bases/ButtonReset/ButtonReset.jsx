import React from "react";

export const ButtonReset = ({ onReset, className = " " }) => {
  return (
    <button className={className} onClick={onReset}>
      Reset
    </button>
  );
};
