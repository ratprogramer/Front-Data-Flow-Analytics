import { useNavigate } from "react-router-dom";

import "./Boton.css";

export function Boton({ path, text, icon }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path);
  };

  return (
    <button className="btn-atomo" onClick={handleNavigate} data-path={path}>
      <span>{icon}</span>
      {text}
    </button>
  );
}
