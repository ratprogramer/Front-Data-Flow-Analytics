import { useState } from "react";
import { BotonesIndice } from "../../../../Moleculas/BotonesIndice/BotonesIndice";
import { ClipboardList, FlaskConical, FileCheck, BarChart3, LogOut, FilePlus, FileChartColumn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./IndicePP_PT_organismo.css";

export function IndicePP_PT_organismo() {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div className="Indice-container-organismo">
      <div className="tttlo">
        <h1>Menú</h1>
        <LogOut style={{ cursor: "pointer" }} onClick={() => navigate("/")} />
      </div>
  
      {/* Renderizar todas las secciones excepto "Informes" */}
      {sections
        .filter(({ id }) => id !== "informes")
        .map(({ id, title, icon, buttons }) => (
          <div key={id} className="btn-sctn-cntnr">
            <div className="btn-sctn" onClick={() => toggleSection(id)}>
              <span>{icon}</span>
              {title}
            </div>
            {openSection === id && (
              <div className="buttons-container">
                {buttons.map((button, index) => (
                  <BotonesIndice key={index} botones={[button]} />
                ))}
              </div>
            )}
          </div>
        ))}
  
      {/* Renderizar "Informes" como un botón independiente pero con el mismo estilo */}
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
