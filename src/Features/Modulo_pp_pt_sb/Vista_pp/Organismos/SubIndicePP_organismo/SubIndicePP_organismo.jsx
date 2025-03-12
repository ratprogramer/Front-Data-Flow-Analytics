import { BotonesIndice } from "../../../../../Moleculas/BotonesIndice/BotonesIndice";
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
import { FilePlus, FileChartColumn } from 'lucide-react';
export function SubIndicePP_organismo() {
  const botones = [
    { path: "/ingreso_producto_p", text: "Registrar producto en proceso", icon: <FilePlus /> },
    { path: "/registrados_pp", text: "Ingresar resultado ", icon: <FileChartColumn /> },
  ];
  return (
    <div className="Indice-container-organismo">
      <TituloPagina
        path={"/menu_Derivado_lacteo_fermentado"}
        text={"Producto en proceso"}
      />
      <BotonesIndice botones={botones} />
    </div>
  );
}
