import { UserRound, CalendarFold, ChartLine, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Switch } from "../../../../Atomos/Switch/Switch";
import { useUser } from "../../../../helpers/userContext";


import "./DatosUsuario.css";
import { useThemeContext } from "../../../../context/ThemeContext";
export function DatosUsuario({ rol, nombre, onChange }) {
  const navigate = useNavigate();
  const { user } = useUser()
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes inicia en 0, por lo que sumamos 1
  const dia = String(fecha.getDate()).padStart(2, "0");

  const handleNavigate = () => {
    sessionStorage.setItem("token", "");
    navigate("/");
  };

  const { contextTheme, setContextTheme } =  useThemeContext();

  const [checked, setChecked] = useState(false);

  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
    setChecked(nextChecked);
  };

  return (
    <div className="datosUsuario-container" id={contextTheme}>
      <div className="datosUsuario" id={contextTheme}>
        <p>
          <span>
            <ChartLine id={contextTheme}/>
          </span>
          {rol || "Analista"}
        </p>
        <p>
          <span>
            <UserRound id={contextTheme}/>
          </span>
          {user || "Juan"}
        </p>
        <p>
          <span>
            <CalendarFold id={contextTheme}/>
          </span>
          <span className="fecha" id={contextTheme}>Fecha:</span> {año}-{mes}-{dia}
        </p>

        <div>
          <Switch onChange={handleSwitch} checked={checked}/>
        </div>

        <p
          className="config" 
          id={contextTheme}
          onClick={() => navigate("/configuracion")}
        >
          <Settings id={contextTheme}/>
          <span>
            Configuración
          </span>
        </p>

        <p className="logOut" onClick={handleNavigate} id={contextTheme}>
          <span style={{display: "flex", alignItems: "center"}}>
            <LogOut className="logOut-a" id={contextTheme}/>
          </span>
          Cerrar sesión
        </p>
      </div>
    </div>
  );
}
