import { memo } from "react";

const NavigationButton = memo(({ label, id, isActive, onClick }) => {
  return (
    <button
      className={`navbutton ${
        isActive ? "text-purple-300 after:w-full after:bg-purple-300" : ""
      }`}
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  );
});

NavigationButton.displayName = "NavigationButton";

export default NavigationButton;
