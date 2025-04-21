import { useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { UsuariosAdd } from "../../Organismos/Usuarios/UsuariosAdd/UsuariosAdd.jsx";
// import { Configuracion } from "../../Organismos/Configuraciones/Configuracion";
import { Dashboard } from "../../Organismos/Dashboard/Dashboard";
import { Muestras } from "../../Organismos/Muestras/Muestras";
import { Analisis } from "../../Organismos/Analisis/Analisis";
import { Reportes } from "../../Organismos/Reportes/Reportes";
import { Usuarios } from "../../Organismos/Usuarios/Usuarios";
import { Icon } from "../../Organismos/IconList/Icon";
import { Aside } from "../../Organismos/Aside/Aside";

import { useThemeContext } from "../../../../../../context/ThemeContext.jsx";

import "./MenuPrincipalAdmin.css";

export const MenuPrincipalAdmin = () => {
  const { contextTheme } = useThemeContext();

    const [activeSection, setActiveSection] = useState("dashboard");
    const currentDate = new Date().toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  
    const sections = {
      dashboard: <Dashboard />,
      muestras: <Muestras />,
      analisis: <Analisis />,
      reportes: <Reportes />,
      usuarios: <Usuarios />,
      usuarioAdd: <UsuariosAdd />
    };
  
    const renderContent = () => sections[activeSection] || <div>Seleccione una opción</div>;
    const navigate = useNavigate();
  
    return (
      <div className="app-container" id={contextTheme}>
        <Aside activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="main-content">
          <header className="main-header">
            <div className="date-display">
              <Icon name="calendar" />
              {currentDate}
            </div>
            <LogOut className="logOutAdmin" onClick={() => navigate("/")}/>
          </header>
          <div className="content-container">{renderContent()}</div>
        </main>
      </div>
    );
  };