import { MenuPrincipal } from "./Features/Modulo_menus/Paginas/MenuPrincipal";
import { IndicePP_PT } from "./Features/Modulo_pp_pt/Indice/Paginas/IndicePP_PT";
import { InicioSesion } from "./Features/Modulo_usuarios/Vista_inicio_sesion/Paginas/InicioSesion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<InicioSesion/>}/>
          <Route path="/menu" element={<MenuPrincipal/>}/>
          <Route path="/menu_Derivado_lacteo_fermentado" element={<IndicePP_PT/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
