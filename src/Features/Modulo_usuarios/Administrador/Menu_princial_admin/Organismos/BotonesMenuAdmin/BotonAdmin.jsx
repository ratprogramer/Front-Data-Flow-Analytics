import './BotonAdmin.css'
export const ButtonAdmin = ({ className = "", onClick, icon, label, isActive }) => {
  return (
    <button className={`nav-item ${isActive ? "active" : ""} ${className}`} onClick={onClick}>
      <span className='iconBtn'>{icon && icon}</span>
      <p className='labelBtn'>{label}</p>
    </button>
  );
};

