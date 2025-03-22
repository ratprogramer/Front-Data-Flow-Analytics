import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";

import { PP_Registrados_PrePT_pagina } from "./Features/Modulo_pp_pt_sb/Vista_pt/Paginas/PP_Registrados_PrePT_pagina/PP_Registrados_PrePT_pagina";
import { MenuPrincipalAdmin }  from "./Features/Modulo_usuarios/Administrador/Menu_princial_admin/Pagina/MenuPrincipalAdmin/MenuPrincipalAdmin";
import { FormularioRegistroPT_pagina } from "./Features/Modulo_pp_pt_sb/Vista_pt/Paginas/FormularioRegistroPT/FormularioRegistroPT_pagina";
import { FormularioRegistroSB_pagina } from "./Features/Modulo_pp_pt_sb/Vista_sb/Paginas/FormularioRegistroSB/FormularioRegistroSB_pagina";
import { Registro_Usuario_Pagina } from "./Features/Modulo_usuarios/Administrador/Vista_registro_usuario/Pagina/Registro_Usuario_Pagina";
import { FormularioRegistroPP_pagina } from "./Features/Modulo_pp_pt_sb/Vista_pp/Paginas/FormularioRegistroPP/FormularioRegistroPP";
import { FormularioResultadoPP } from "./Features/Modulo_pp_pt_sb/Vista_pp/Paginas/FormularioResultadoPP/FormularioResultadoPP";
import { FormularioResultadoPT } from "./Features/Modulo_pp_pt_sb/Vista_pt/Paginas/FormularioResultadoPT/FormularioResultadoPT";
import { FormularioResultadoSB } from "./Features/Modulo_pp_pt_sb/Vista_sb/Paginas/FormularioResultadoSB/FormularioResultadoSB";
import { PrePrevisualizacion } from "./Features/Modulo_informes/Organismos/PrePrevisualizacion/PrePrevisualizacion";
import { Pp_Registrados } from "./Features/Modulo_pp_pt_sb/Vista_pp/Paginas/Pp_Registrados/Pp_Registrados";
import { Sb_Registrados } from "./Features/Modulo_pp_pt_sb/Vista_sb/Paginas/Sb_Registrados/Sb_Registrados";
import { Pt_Registrados } from "./Features/Modulo_pp_pt_sb/Vista_pt/Paginas/Pt_Registrados/Pt_Registrados";
import { InicioSesion } from "./Features/Modulo_usuarios/Vista_inicio_sesion/Paginas/InicioSesion";
import { SubIndicePP } from "./Features/Modulo_pp_pt_sb/Vista_pp/Paginas/SubindicePP/SubIndicePP";
import { SubIndiceSB } from "./Features/Modulo_pp_pt_sb/Vista_sb/Paginas/SubindiceSB/SubIndiceSB";
import { SubIndicePT } from "./Features/Modulo_pp_pt_sb/Vista_pt/Paginas/SubindicePT/SubIndicePT";
import { VistaInforme } from "./Features/Modulo_informes/Paginas/VistaInforme/VistaInforme";
import { IndicePP_PT } from "./Features/Modulo_pp_pt_sb/Indice/Paginas/IndicePP_PT";
import { ErrorPage } from "./Features/NotFound/Organisms/ErrorPage";
import { ProtectedRoute } from "./helpers/ProtectedRoute";
import { useThemeContext } from "./context/ThemeContext";
import { LoadPage } from "./Features/LoadPage/LoadPage";
import { UserProvider } from "./helpers/userContext";

import "./app.css";

function App() {
  const { contextTheme } = useThemeContext();
  const location = useLocation();
  const navigationType = useNavigationType();
  const [loading, setLoading] = useState(true);
  const [transitionDirection, setTransitionDirection] = useState("slide-left");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTransitionDirection(navigationType === "POP" ? "slide-right" : "slide-left");
  }, [location, navigationType]);

  if (loading) {
    return <LoadPage />;
  }

  return (
    
    <div className="route-transition-container" id={contextTheme}>
      <UserProvider>
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames={transitionDirection}
            unmountOnExit
            >
            <Routes location={location} >
              <Route path="/" element={<InicioSesion />} />

              <Route
                path="/menu"
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
                path="/registrados_pp"
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
                path="/sub_menu_sb"
                element={
                  <ProtectedRoute>
                    <SubIndiceSB/>
                  </ProtectedRoute>
                }
                />

              <Route
                path="/ingreso_sb"
                element={
                  <ProtectedRoute>
                    <FormularioRegistroSB_pagina />
                  </ProtectedRoute>
                }
                />

              <Route
                path="/registrados_sb"
                element={
                  <ProtectedRoute>
                    <Sb_Registrados />
                  </ProtectedRoute>
                }
                />

              <Route
                path="/ingreso_resultado_sb"
                element={
                  <ProtectedRoute>
                    <FormularioResultadoSB/>
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
                path="/seleccion_muestras"
                element={
                  <ProtectedRoute>
                    <PrePrevisualizacion />
                  </ProtectedRoute>
                }
                />

              <Route
                path="/informe"
                element={
                  <ProtectedRoute>
                    <VistaInforme/>
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

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </UserProvider>
    </div>
  );
}

export default App;