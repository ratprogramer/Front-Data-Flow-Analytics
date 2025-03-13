export const ButtonAdmin = ({ className = "", onClick, icon, label, isActive }) => {
  return (
    <button className={`nav-item ${isActive ? "active" : ""} ${className}`} onClick={onClick}>
      {icon && icon}
      <span>{label}</span>
    </button>
  );
};

