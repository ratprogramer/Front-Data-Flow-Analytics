import { useState, useEffect } from "react";
import { BotonesIndice } from "../../../../Moleculas/BotonesIndice/BotonesIndice";
import { TituloPagina } from "../../../../Moleculas/TituloPagina/TituloPagina";
// import { ClipboardList, Flask, FileCheck, BarChart3 } from "lucide-react";
// import { ClipboardList, FlaskRoundIcon as Flask, FileCheck, BarChart3 } from "lucide-react"
// import { ClipboardList, Flask, FileCheck, BarChart3 } from "lucide-react";
import { ClipboardList, FlaskConical, FileCheck, BarChart3 } from "lucide-react";

import "./IndicePP_PT_organismo.css";

export function IndicePP_PT_organismo() {
  const botones = [
    { path: "/sub_menu_pp", text: "Producto en Proceso", icon: <ClipboardList /> },
    { path: "/sub_menu_sb", text: "Saborización", icon: <FlaskConical /> },
    { path: "/sub_menu_pt", text: "Producto Terminado", icon: <FileCheck /> },
    { path: "/seleccion_muestras", text: "Informes", icon: <BarChart3 /> },
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
      {/* <TituloPagina path={"/"} text={"Derivado Lacteo Fermentado"} /> */}
      <h1>Derivado Lácteo Fermentado</h1>
      <BotonesIndice botones={botones} />

    </div>
  );
}
