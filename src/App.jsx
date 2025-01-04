import { MenuPrincipal } from "./Features/Modulo_menus/Paginas/MenuPrincipal";
import { IndicePP_PT } from "./Features/Modulo_pp_pt/Indice/Paginas/IndicePP_PT";
import { InicioSesion } from "./Features/Modulo_usuarios/Vista_inicio_sesion/Paginas/InicioSesion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import "./app.css"
import { SubIndicePP } from "./Features/Modulo_pp_pt/Vista_pp/Paginas/SubindicePP/SubIndicePP";
import { FormularioRegistroPP_pagina } from "./Features/Modulo_pp_pt/Vista_pp/Paginas/FormularioRegistroPP/FormularioRegistroPP";
import { FormularioResultadoPP } from "./Features/Modulo_pp_pt/Vista_pp/Paginas/FormularioResultadoPP/FormularioResultadoPP";
import { Pp_Registrados } from "./Features/Modulo_pp_pt/Vista_pp/Paginas/Pp_Registrados/Pp_Registrados";


import { SubIndicePT } from "./Features/Modulo_pp_pt/Vista_pt/Paginas/SubindicePT/SubIndicePT";
import { FormularioRegistroPT_pagina } from "./Features/Modulo_pp_pt/Vista_pt/Paginas/FormularioRegistroPT/FormularioRegistroPT_pagina"; 

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
          <Route path="/productos_registrados_pp" element={<Pp_Registrados/>}></Route>
          <Route path="/ingreso_resultado_producto_p" element={<FormularioResultadoPP/>}/>

          <Route path="/sub_menu_pt" element ={<SubIndicePT/>}/> 
          <Route path="/ingreso_producto_t" element={<FormularioRegistroPT_pagina/>}></Route>
          <Route path="/productos_registrados_pt" element={<h1>a</h1>}></Route>
          <Route path="/ingreso_resultado_producto_t" element={<h1>a</h1>}/>


        </Routes>
      </Router>
    </>
  )
}

export default App
