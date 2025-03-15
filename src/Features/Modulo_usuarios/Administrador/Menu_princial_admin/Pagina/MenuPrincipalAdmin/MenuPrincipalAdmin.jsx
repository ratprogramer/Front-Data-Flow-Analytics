{/* 
╔ -> alt + 201
╚ -> alt + 200
╗ -> alt + 187
╝ -> alt + 188
║ -> alt + 186
═ -> alt + 205

╔═════════════════════════════════════════════════════════╗
║Este componente es el menu principal del admin anterior  ║
╚═════════════════════════════════════════════════════════╝


import { DatosAdmin } from "../../Organismos/DatosAdmin/DatosAdmin";
import { BotonesMenuAdmin } from "../../Organismos/BotonesMenuAdmin/BotonesMenuAdmin";
import "./MenuPrincipalAdmin.css"

export function MenuPrincipalAdmin(){
    return(
        <div className="MenuPrincipal-container-pagina-admin">
            <div className="main-menu-container-admin">
                <h1  className="Menu-titulo-container-admin" >Menú</h1>
                <BotonesMenuAdmin />
            </div>
            <DatosAdmin />
        </div>
    )
}
*/}

import { useState } from "react";
import { Aside } from "../../Organismos/Aside/Aside";
import { Icon } from "../../Organismos/IconList/Icon";
import { Dashboard } from "../../Organismos/Dashboard/Dashboard";
import { Muestras } from "../../Organismos/Muestras/Muestras";
import { Analisis } from "../../Organismos/Analisis/Analisis";
import { Reportes } from "../../Organismos/Reportes/Reportes";
import { Configuracion } from "../../Organismos/Configuraciones/Configuracion";
import { Usuarios } from "../../Organismos/Usuarios/Usuarios";
import { UsuariosAdd } from "../../Organismos/Usuarios/UsuariosAdd/UsuariosAdd.jsx";
import { LogOut } from "lucide-react";
import "./MenuPrincipalAdmin.css";

export const MenuPrincipalAdmin = () => {
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
      configuracion: <Configuracion />,
      usuarios: <Usuarios />,
      usuarioAdd: <UsuariosAdd />,
    };
  
    const renderContent = () => sections[activeSection] || <div>Seleccione una opción</div>;
  
    return (
      <div className="app-container">
        <Aside activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="main-content">
          <header className="main-header">
            <div className="date-display">
              <Icon name="calendar" />
              {currentDate}
            </div>
            <LogOut className="logOut" onClick={()=> { alert('LogOut')/* aquí iría la función para cerrar la sesión */ }}/>
          </header>
          <div className="content-container">{renderContent()}</div>
        </main>
      </div>
    );
  };