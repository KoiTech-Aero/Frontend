import { BrowserRouter, Routes, Route } from "react-router";

import PesquisarNorma from "./pages/PesquisarNorma";
import LayoutSistema from "./layouts/LayoutSistema";
import VisualizarNorma from "./pages/VisualizarNorma";
import CadastrarNorma from "./pages/CadastrarNorma";
import CadastrarVersao from "./pages/CadastrarVersao";

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
          <Route path="/cadastrarNorma" element={<CadastrarNorma />} />
          <Route path="/cadastrarVersao" element={<CadastrarVersao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
