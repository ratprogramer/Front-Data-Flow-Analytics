import { MenuPrincipal } from "./Features/Modulo_menus/Paginas/MenuPrincipal";
import { IndicePP_PT } from "./Features/Modulo_pp_pt/Indice/Paginas/IndicePP_PT";
import { InicioSesion } from "./Features/Modulo_usuarios/Vista_inicio_sesion/Paginas/InicioSesion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Pp_Registrados } from "./Features/Modulo_pp_pt/Vista_pp/Paginas/Pp_Registrados/Pp_Registrados";
import "./app.css"
import { FormularioRegistroPP_pagina } from "./Features/Modulo_pp_pt/Vista_pp/Paginas/FormularioRegistroPP/FormularioRegistroPP";
import { SubIndicePP } from "./Features/Modulo_pp_pt/Vista_pp/Paginas/SubindicePP/SubIndicePP";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<InicioSesion/>}/>
          <Route path="/menu" element={<MenuPrincipal/>}/>

          <Route path="/menu_Derivado_lacteo_fermentado" element={<IndicePP_PT/>}/>
          
          <Route path="/sub_menu_pp" element ={<SubIndicePP/>}/> 
          <Route path="/ingreso_producto_p" element={<FormularioRegistroPP_pagina/>}></Route>
          <Route path="/productos_registrados_pp" element={<Pp_Registrados></Pp_Registrados>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
