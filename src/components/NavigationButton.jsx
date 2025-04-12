import React from "react";

const NavigationButton = ({ label, id, isActive, isDarkMode, onClick }) => {
  return (
    <button
      className={`navbutton ${
        isActive
          ? isDarkMode
            ? "dark:text-purple-300 after:w-full"
            : "text-purple-600 after:w-full"
          : ""
      }`}
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  );
};

export default NavigationButton;
