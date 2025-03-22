import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

import { useThemeContext } from "../../context/ThemeContext";
import "./Modal.css";

export const Modal = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const contextTheme = useThemeContext();

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Cambiar Contraseña</h2>
        <form>
          <div className="input-group">
            <label>Nueva Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <Eye /> : <EyeClosed />}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label>Confirmar Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onPaste={(e) => e.preventDefault()}
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye /> : <EyeClosed />}
              </span>
            </div>
          </div>

          <button type="submit" className="save-btn" >Guardar</button>
          <button type="button" className="close-btn" onClick={onClose} id={contextTheme}>
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};
