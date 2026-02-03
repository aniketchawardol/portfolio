import { memo } from "react";

const NavigationButton = memo(({ label, id, isActive, onClick }) => {
  return (
    <button
      className={`navbutton ${
        isActive ? "text-[#FF5C00] after:w-full after:bg-[#FF5C00]" : ""
      }`}
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  );
});

NavigationButton.displayName = "NavigationButton";

export default NavigationButton;
