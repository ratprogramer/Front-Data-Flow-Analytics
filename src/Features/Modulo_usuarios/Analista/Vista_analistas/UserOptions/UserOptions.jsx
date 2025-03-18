import { DatosUsuario } from "../../../../Modulo_menus/Organismos/DatosUsuario/DatosUsuario"
import userPhoro from '../../../../../imgs/foto-perfil.png'
import "./UserOptions.css"
import { useEffect, useRef } from "react"

export const UserOptions = () => {
  
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
    <div className="user-options-container" ref={dropdownRef}>
      <label htmlFor="user-dropdown" className="dropdown-toggle">
        <img src={userPhoro} alt="Logo" className="logo-image" />
      </label>
      <input type="checkbox" id="user-dropdown" className="dropdown-checkbox" ref={checkboxRef} />
      <div className="content-user-desp">
        <div className="userImg">
          <img src={userPhoro} alt="userImg" />
        </div>
        <DatosUsuario />
      </div>
    </div>
  )
}

