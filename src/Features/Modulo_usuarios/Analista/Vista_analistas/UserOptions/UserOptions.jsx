import { useEffect, useRef } from "react"

import { DatosUsuario } from "../../../../Modulo_menus/Organismos/DatosUsuario/DatosUsuario"
import us from '../../../../../imgs/us.jpg'

import "./UserOptions.css"
import { useThemeContext } from "../../../../../context/ThemeContext";

export const UserOptions = () => {
  const { contextTheme } = useThemeContext();

  const dropdownRef = useRef(null);
  const checkboxRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      if (!dropdownRef.current?.contains(target) && checkboxRef.current?.checked) {
        checkboxRef.current.checked = false;
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="user-options-container" ref={dropdownRef} id={contextTheme}>
      <label htmlFor="user-dropdown" className="dropdown-toggle" id={contextTheme}>
        <img src={us} alt="Logo" className="logo-image" id={contextTheme} />
      </label>
      <input type="checkbox" id="user-dropdown" className="dropdown-checkbox" ref={checkboxRef} />
      <div className="content-user-desp" id={contextTheme}>
        <div className="userImg">
          <img src={us} alt="userImg" />
        </div>
        <DatosUsuario />
      </div>
    </div>
  )
}

