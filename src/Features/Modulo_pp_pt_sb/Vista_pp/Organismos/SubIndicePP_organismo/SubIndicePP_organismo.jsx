import { BotonesIndice } from "../../../../../Moleculas/BotonesIndice/BotonesIndice";
import { TituloPagina } from "../../../../../Moleculas/TituloPagina/TituloPagina";
export function SubIndicePP_organismo() {
  const botones = [
    { path: "/ingreso_producto_p", text: "Registrar producto en proceso" },
    { path: "/ingreso_saborizacion", text: "Registrar saborizacion" },
    { path: "/productos_registrados_pp", text: "Ingresar resultado " },
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
