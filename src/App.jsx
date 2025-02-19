import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./app.css"

import { InicioSesion } from "./Features/Modulo_usuarios/Vista_inicio_sesion/Paginas/InicioSesion";

import { MenuPrincipalAdmin } from "./Features/Modulo_usuarios/Administrador/Menu_princial_admin/Pagina/MenuPrincipalAdmin/MenuPrincipalAdmin";
import { Registro_Usuario_Pagina } from "./Features/Modulo_usuarios/Administrador/Vista_registro_usuario/Pagina/Registro_Usuario_Pagina";





import { MenuPrincipal } from "./Features/Modulo_menus/Paginas/MenuPrincipal";

import { IndicePP_PT } from "./Features/Modulo_pp_pt/Indice/Paginas/IndicePP_PT";
import { SubIndicePP } from "./Features/Modulo_pp_pt/Vista_pp/Paginas/SubindicePP/SubIndicePP";
import { FormularioRegistroPP_pagina } from "./Features/Modulo_pp_pt/Vista_pp/Paginas/FormularioRegistroPP/FormularioRegistroPP";
import { FormularioResultadoPP } from "./Features/Modulo_pp_pt/Vista_pp/Paginas/FormularioResultadoPP/FormularioResultadoPP";
import { Pp_Registrados } from "./Features/Modulo_pp_pt/Vista_pp/Paginas/Pp_Registrados/Pp_Registrados";


import { SubIndicePT } from "./Features/Modulo_pp_pt/Vista_pt/Paginas/SubindicePT/SubIndicePT";
import { PP_Registrados_PrePT_pagina } from "./Features/Modulo_pp_pt/Vista_pt/Paginas/PP_Registrados_PrePT_pagina/PP_Registrados_PrePT_pagina";
import { FormularioRegistroPT_pagina } from "./Features/Modulo_pp_pt/Vista_pt/Paginas/FormularioRegistroPT/FormularioRegistroPT_pagina";
import { Pt_Registrados } from "./Features/Modulo_pp_pt/Vista_pt/Paginas/Pt_Registrados/Pt_Registrados";
import { FormularioResultadoPT } from "./Features/Modulo_pp_pt/Vista_pt/Paginas/FormularioResultadoPT/FormularioResultadoPT";


import { ProtectedRoute } from "./helpers/ProtectedRoute";



function App() {
  // comentario de prueba
  return (
    <>
  <Router>
    <Routes>
      <Route path="/" element={<InicioSesion />} />

      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <MenuPrincipal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/menu_Derivado_lacteo_fermentado"
        element={
          <ProtectedRoute>
            <IndicePP_PT />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sub_menu_pp"
        element={
          <ProtectedRoute>
            <SubIndicePP />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ingreso_producto_p"
        element={
          <ProtectedRoute>
            <FormularioRegistroPP_pagina />
          </ProtectedRoute>
        }
      />

      <Route
        path="/productos_registrados_pp"
        element={
          <ProtectedRoute>
            <Pp_Registrados />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ingreso_resultado_producto_p"
        element={
          <ProtectedRoute>
            <FormularioResultadoPP />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sub_menu_pt"
        element={
          <ProtectedRoute>
            <SubIndicePT />
          </ProtectedRoute>
        }
      />

      <Route
        path="/productos_registrados_pp_"
        element={
          <ProtectedRoute>
            <PP_Registrados_PrePT_pagina />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ingreso_producto_t"
        element={
          <ProtectedRoute>
            <FormularioRegistroPT_pagina />
          </ProtectedRoute>
        }
      />

      <Route
        path="/productos_registrados_pt"
        element={
          <ProtectedRoute>
            <Pt_Registrados />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ingreso_resultado_producto_t"
        element={
          <ProtectedRoute>
            <FormularioResultadoPT />
          </ProtectedRoute>
        }
      />

      <Route
        path="/menu_admin"
        element={
          <ProtectedRoute>
            <MenuPrincipalAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/registro_usuario"
        element={
          <ProtectedRoute>
            <Registro_Usuario_Pagina />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
</>
  )
}

export default App
