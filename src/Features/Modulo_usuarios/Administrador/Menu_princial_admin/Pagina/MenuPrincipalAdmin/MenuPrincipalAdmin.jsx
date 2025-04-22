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
import { Switch } from "../../../../../../Atomos/Switch/Switch.jsx";

import { useThemeContext } from "../../../../../../context/ThemeContext.jsx";

import "./MenuPrincipalAdmin.css";

export const MenuPrincipalAdmin = () => {
  // const { contextTheme } = useThemeContext();
    const { contextTheme, setContextTheme } =  useThemeContext();
    const [checked, setChecked] = useState(false);

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

    const handleSwitch = (nextChecked) => {
      setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
      setChecked(nextChecked);
    }
  
    return (
      <div className="app-container" id={contextTheme}>
        <Aside activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="main-content" id={contextTheme}>
          <header className="main-header" id={contextTheme}>
            <div className="supDiv">
              <div className="switchDiv">
                <Switch onChange={handleSwitch} checked={checked} />
              </div>
              <div className="date-display">
                <Icon name="calendar" />
                {currentDate}
              </div>
              </div>
            <div className="btnsContainer">
              <LogOut className="logOutAdmin" onClick={() => navigate("/")}/>
            </div>
          </header>
          <div className="content-container" id={contextTheme}>{renderContent()}</div>
        </main>
      </div>
    );
  };