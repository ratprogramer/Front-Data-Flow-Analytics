import { ClipboardList, FlaskConical, FileCheck, BarChart3, FilePlus, FileChartColumn } from "lucide-react";
import { useState } from "react";

import { UserOptions } from "../../../Modulo_usuarios/Analista/Vista_analistas/UserOptions/UserOptions";
import { BotonesIndice } from "../../../../Moleculas/BotonesIndice/BotonesIndice";
import { Notification } from '../../../Notification/Notification'
import "./IndicePP_PT_organismo.css";
import { useThemeContext } from "../../../../context/ThemeContext";

// import ReactSwitch from "react-switch";

export function IndicePP_PT_organismo() {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: "pp",
      title: "Producto en proceso",
      icon: <ClipboardList />,
      buttons: [
        { path: "/ingreso_producto_p", text: "Registrar producto", icon: <FilePlus /> },
        { path: "/registrados_pp", text: "Ingresar resultado", icon: <FileChartColumn /> },
      ],
    },
    {
      id: "sb",
      title: "Saborización",
      icon: <FlaskConical />,
      buttons: [
        { path: "/ingreso_sb", text: "Registrar saborización", icon: <FilePlus /> },
        { path: "/registrados_sb", text: "Ingresar resultado", icon: <FileChartColumn /> },
      ],
    },
    {
      id: "pt",
      title: "Producto terminado",
      icon: <FileCheck />,
      buttons: [
        { path: "/productos_registrados_pp_", text: "Registrar producto", icon: <FilePlus /> },
        { path: "/productos_registrados_pt", text: "Ingresar resultado", icon: <FileChartColumn /> },
      ],
    },
    {
      id: "informes",
      title: "Informes",
      icon: <BarChart3 />,
      buttons: [{ path: "/seleccion_muestras", text: "Informes", icon: <BarChart3 /> }],
    },
  ];

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  /* 
    Ejemplo de notificaciones, estos deberían reemplazarse con las cards. 
    ver el componente Notification.jsx en Features.
  */
  const notif = [
    { id: 1, message: 'Tienes nuevas notificaciones.' },  
    { id: 2, message: 'Mensaje importante 1' },
    { id: 3, message: 'Mensaje importante 2' },
    { id: 4, message: 'Mensaje importante 3' },
    { id: 5, message: 'Mensaje importante 4' },
    { id: 6, message: 'Mensaje importante 5' },
    { id: 7, message: 'Mensaje importante 6' },
    { id: 8, message: 'Mensaje importante 7' },
    { id: 9, message: 'Mensaje importante 8' },
    { id: 10, message: 'Mensaje importante 9' },
    { id: 11, message: 'Mensaje importante 10' },
  ];

  const { contextTheme } = useThemeContext();

  return (
    <div className="Indice-container-organismo" id={contextTheme}>
      <div className="tttlo" id={contextTheme}>
        <h1>Menú</h1>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <Notification notif={notif} />
        <UserOptions />
        </div>
      </div>
  
      {sections
        .filter(({ id }) => id !== "informes")
        .map(({ id, title, icon, buttons }) => (
          <div key={id} className="btn-sctn-cntnr" id={contextTheme}>
            <div className="btn-sctn" onClick={() => toggleSection(id)} id={contextTheme}>
              <span>{icon}</span>
              {title}
            </div>
            {openSection === id && (
              <div className="buttons-container" id={contextTheme}>
                {buttons.map((button, index) => (
                  <BotonesIndice key={index} botones={[button]} id={contextTheme}/>
                ))}
              </div>
            )}
          </div>
        ))}
  
      {sections.find(({ id }) => id === "informes") && (
        <div className="btn-sctn-a">
          <BotonesIndice
            botones={[
              {
                path: "/seleccion_muestras",
                text: "Informes",
                icon: <BarChart3 />,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
