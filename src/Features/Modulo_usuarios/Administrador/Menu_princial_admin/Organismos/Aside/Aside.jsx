import { ButtonAdmin } from "../../Organismos/BotonesMenuAdmin/BotonAdmin";
import logo from "../../../../../../imgs/logoDFA blanco.png";
import { Icon } from "../../Organismos/IconList/Icon";
import { ShieldUser } from "lucide-react";
import "./Aside.css";

export const Aside = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="logo" />
        <h2>Data Flow Analytics</h2>
      </div>

      <nav className="sidebar-nav">
        {[
          { key: "dashboard", label: "Dashboard", icon: "dashboard" },
          { key: "muestras", label: "Muestras", icon: "flask" },
          { key: "analisis", label: "Análisis", icon: "clipboard" },
          { key: "reportes", label: "Reportes", icon: "file" },
          { key: "usuarios", label: "Usuarios", icon: "users" },
          { key: "usuarioAdd", label: "Agregar Usuario", icon: "userPlus" },
          { key: "configuracion", label: "Configuración", icon: "settings" },
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
      <div className="user-profile">
          <div className="avatar">
          <ShieldUser />
          </div>
          <div className="user-info">
            <h3>Administrador</h3>
            <p>Nombre del Administrador</p>
          </div>
        </div>
    </aside>
  );
};
