import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import "./Boton.css";

export function Boton({ path, text, icon }) {
  const { contextTheme } = useThemeContext();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path);
  };

  return (
    <button className="btn-atomo" onClick={handleNavigate} data-path={path} id={contextTheme}>
      <span>{icon}</span>
      {text}
    </button>
  );
}
