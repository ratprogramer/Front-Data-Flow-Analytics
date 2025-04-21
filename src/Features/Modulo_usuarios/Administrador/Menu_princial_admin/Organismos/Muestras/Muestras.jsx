import "./Muestras.css";
import { PpSub } from "../subVistasAdmin/PpSub";
import { PtSub } from "../subVistasAdmin/PtSub";
import { SbSub } from "../subVistasAdmin/SbSub";
import { useState } from "react";
import { useThemeContext } from "../../../../../../context/ThemeContext";

const samplesList = [
  { id: 1, lote: "12345", name: "Productos en proceso", type: "PP", status: "Completada", date: "01/03/2025" },
  { id: 2, lote: "12345", name: "Productos terminados", type: "PT", status: "Completada", date: "02/03/2025" },
  { id: 3, lote: "12345", name: "Saborizaciones", type: "SB", status: "Completada", date: "02/03/2025" },
];

export const Muestras = () => {
  const [activeSubSection, setActiveSubSection] = useState("");
  const [showBlankContainer, setShowBlankContainer] = useState(false);

  const { contextTheme } = useThemeContext();

  const subSections = {
    PP: <PpSub />, 
    PT: <PtSub />, 
    SB: <SbSub />,
  };

  const handleClick = (type) => {
    setShowBlankContainer(true);
    setTimeout(() => {
      setShowBlankContainer(false);
      setActiveSubSection(type);
    }, 300);
  };

  const renderContent = () => {
    if (showBlankContainer) return <div className="blank-container"></div>;
    return subSections[activeSubSection] || <div>Seleccione una opción</div>;
  };


  return (
    <div className="samples-content">
      {activeSubSection ? (
        <div className="subsamples-content">
          <button className="btnMstrs" onClick={() => setActiveSubSection("")}>Volver</button>
          {renderContent()}
        </div>
      ) : (
        <div className="samples-grid">
          {samplesList.map(({ id, name, type, status }) => (
            <div className="sample-card" id={contextTheme} key={id} onClick={() => handleClick(type)}>
              <div className="sample-header">
                <h3>{name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
