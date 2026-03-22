import { BrowserRouter, Routes, Route } from "react-router";

import Layout from "./layouts/LayoutSistema";
import PesquisarNorma from "./pages/PesquisarNorma";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas (login)
        <Route element={<AuthLayout />}>
          <Route path="" />
        </Route> */}

        {/* Rotas do privadas (sistema) */}
        <Route path="/" element={<Layout />}>
          <Route path="/pesquisarNorma" element={<PesquisarNorma />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
