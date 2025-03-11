import { useState, useEffect } from "react";
import { BotonesIndice } from "../../../../Moleculas/BotonesIndice/BotonesIndice";
import { TituloPagina } from "../../../../Moleculas/TituloPagina/TituloPagina";
import "./IndicePP_PT_organismo.css";

export function IndicePP_PT_organismo() {
  const botones = [
    { path: "/sub_menu_pp", text: "Producto en Proceso" },
    { path: "/sub_menu_sb", text: "Saborizacion" },
    { path: "/sub_menu_pt", text: "Producto Terminado" },
    { path: "/seleccion_muestras", text: "Informes" },
  ];

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="Indice-container-organismo">
      <TituloPagina path={"/"} text={"Derivado Lacteo Fermentado"} />
      
      {isDesktop ? (
        <aside className="menu-aside">
          <BotonesIndice botones={botones} />
        </aside>
      ) : (
        <BotonesIndice botones={botones} />
      )}
    </div>
  );
}
