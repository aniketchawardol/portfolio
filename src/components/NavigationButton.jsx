import React from "react";

const NavigationButton = ({ label, id, isActive, onClick }) => {
  return (
    <button
      className={`navbutton ${
        isActive
            ? "dark:text-purple-300 text-purple-600 after:w-full"
          : ""
      }`}
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  );
};

export default NavigationButton;
