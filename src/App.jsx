import { BrowserRouter, Routes, Route } from "react-router";

import PesquisarNorma from "./pages/PesquisarNorma";
import LayoutSistema from "./layouts/LayoutSistema";
import VisualizarNorma from "./pages/VisualizarNorma";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas (login)
        <Route element={<AuthLayout />}>
          <Route path="" />
        </Route> */}

        {/* Rotas do privadas (sistema) */}
        <Route path="/" element={<LayoutSistema />}>
          <Route path="/pesquisarNorma" element={<PesquisarNorma />} />
          <Route path="/visualizarNorma" element={<VisualizarNorma />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
