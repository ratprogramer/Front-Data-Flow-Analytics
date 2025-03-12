import { BotonesIndice } from "../../../../../Moleculas/BotonesIndice/BotonesIndice";
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
import { FilePlus, FileChartColumn } from 'lucide-react';

export function SubIndiceSB_organismo() {
  const botones = [
    { path: "/ingreso_sb", text: "Registrar saborizacion", icon: <FilePlus /> },
    { path: "/registrados_sb", text: "Ingresar resultado ", icon: <FileChartColumn /> },
  ];
  return (
    <div className="Indice-container-organismo">
      <TituloPagina
        path={"/menu_Derivado_lacteo_fermentado"}
        text={"Saborizacion"}
      />
      <BotonesIndice botones={botones} />
    </div>
  );
}
