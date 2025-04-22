import { ButtonAdmin } from "../../Organismos/BotonesMenuAdmin/BotonAdmin";
import logo from "../../../../../../imgs/logoDFAblanco.png";
import { Icon } from "../../Organismos/IconList/Icon";
import { ShieldUser } from "lucide-react";
import { useUser } from "../../../../../../helpers/userContext";
import { useThemeContext } from "../../../../../../context/ThemeContext";

import "./Aside.css";

export const Aside = ({ activeSection, setActiveSection }) => {
  const { user } = useUser();

  const { contextTheme } = useThemeContext();

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
      <div className="user-profile" id={contextTheme}>
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
