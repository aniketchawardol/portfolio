

const NavigationButton = ({ label, id, isActive, onClick }) => {
  return (
    <button
      className={`navbutton ${
        isActive
            ? "text-purple-300 after:w-full"
          : ""
      }`}
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  );
};

export default NavigationButton;
