import { ButtonAdmin } from "../../Organismos/BotonesMenuAdmin/BotonAdmin";
import logo from "../../../../../../imgs/logoDFAblanco.png";
import { Icon } from "../../Organismos/IconList/Icon";
import { ShieldUser } from "lucide-react";
import { useUser } from "../../../../../../helpers/userContext";
import { useState, useEffect, useRef } from "react";
import { Switch } from "../../../../../../Atomos/Switch/Switch";
import { useThemeContext } from "../../../../../../context/ThemeContext";

import "./Aside.css";

export const Aside = ({ activeSection, setActiveSection }) => {
  const { user } = useUser();
  const [modal, setModal] = useState(false);
  const modalRef = useRef(null);

  const { contextTheme, setContextTheme } =  useThemeContext();
  const [checked, setChecked] = useState(false);



  // Cierra el modal al presionar Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModal(false);
    }
  };

  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
    setChecked(nextChecked);
  }

  return (
    <aside className="sidebar" id={contextTheme}>
      <div className="sidebar-header" id={contextTheme}>
        <img src={logo} alt="logo" />
        <h2>Data Flow Analytics</h2>
      </div>

      <nav className="sidebar-nav" id={contextTheme}>
        {[
          { key: "dashboard", label: "Dashboard", icon: "dashboard" },
          { key: "muestras", label: "Muestras", icon: "flask" },
          { key: "reportes", label: "Reportes", icon: "file" },
          { key: "usuarios", label: "Usuarios", icon: "users" },
          { key: "usuarioAdd", label: "Agregar Usuario", icon: "userPlus" },
        ].map(({ key, label, icon }) => (
          <ButtonAdmin
            key={key}
            className={`nav-item ${activeSection === key ? "active" : ""}`}
            onClick={() => setActiveSection(key)}
            icon={<Icon name={icon} />}
            label={label}
            isActive={activeSection === key}
          />
        ))}
      </nav>

      {modal && (
        <div
          className="dropdown-menu"
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          id={contextTheme}
        >
          <ul>
            <li><a href="#">Opción 2</a></li>
            <li><a href="#">Opción 3</a></li>
            <li><a href="#">Opción 4</a></li>
            <li><a href="#">Opción 5</a></li>
            <li>
              <Switch onChange={handleSwitch} checked={checked} />
            </li>
          </ul>
        </div>
      )}
      <div className="user-profile" id={contextTheme} onClick={() => setModal(!modal)}>
        <div className="avatar" title="Admin">
          <ShieldUser />
        </div>
        <div className="user-info">
          <h3>Administrador</h3>
          <p>{user}</p>
        </div>

      </div>

    </aside>
  );
};
