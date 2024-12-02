import { MenuPrincipal } from "./Features/Modulo_menus/Paginas/MenuPrincipal";
import { InicioSesion } from "./Features/Modulo_usuarios/Vista_inicio_sesion/Paginas/InicioSesion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<InicioSesion/>}/>
          <Route path="/menu" element={<MenuPrincipal/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
