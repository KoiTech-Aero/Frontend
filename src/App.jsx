import { BrowserRouter, Routes, Route } from "react-router";

import { AuthProvider } from "./context/AuthProvider";
import RotaPrivada from "./routes/RotaPrivada";

import { PERMISSOES } from "./enums/permissoes"

import AuthLayout from "./layouts/LayoutAuth";
import LayoutSistema from "./layouts/LayoutSistema";

import Login from "./pages/Login";
import PesquisarNorma from "./pages/PesquisarNorma";
import VisualizarNorma from "./pages/VisualizarNorma";
import CadastrarNorma from "./pages/CadastrarNorma";
import CadastrarVersao from "./pages/CadastrarVersao";
import VisualizarVersao from "./pages/VisualizarVersao";
import SolicitarNorma from "./pages/SolicitarNorma";
import EditarUsuario from "./pages/EditarUsuario";
import CadastrarUsuario from "./pages/CadastrarUsuario";
import VisualizarUsuarios from "./pages/VisualizarUsuarios";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Públicas */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Privadas (login obrigatório) */}
          <Route
            element={
              <RotaPrivada>
                <LayoutSistema />
              </RotaPrivada>
            }
          >
            <Route
              path="/pesquisarNorma"
              element={
                <RotaPrivada permissao={PERMISSOES.PESQUISAR}>
                  <PesquisarNorma />
                </RotaPrivada>
              }
            />

            <Route
              path="/visualizarNorma"
              element={
                <RotaPrivada permissao={PERMISSOES.VISUALIZAR}>
                  <VisualizarNorma />
                </RotaPrivada>
              }
            />

            <Route
              path="/visualizarVersao"
              element={
                <RotaPrivada permissao={PERMISSOES.VISUALIZAR}>
                  <VisualizarVersao />
                </RotaPrivada>
              }
            />

            <Route
              path="/cadastrarNorma"
              element={
                <RotaPrivada permissao={PERMISSOES.CADASTRAR_NORMA}>
                  <CadastrarNorma />
                </RotaPrivada>
              }
            />

            <Route
              path="/cadastrarVersao"
              element={
                <RotaPrivada permissao={PERMISSOES.CADASTRAR_VERSAO}>
                  <CadastrarVersao />
                </RotaPrivada>
              }
            />

            <Route
              path="/solicitarNorma"
              element={
                <RotaPrivada permissao={PERMISSOES.SOLICITAR}>
                  <SolicitarNorma />
                </RotaPrivada>
              }
            />

            <Route
              path="/cadastrarUsuario"
              element={
                <RotaPrivada permissao={PERMISSOES.CADASTRAR_USUARIO}>
                  <CadastrarUsuario />
                </RotaPrivada>
              }
            />

            <Route
              path="/editarUsuario/:id"
              element={
                <RotaPrivada permissao={PERMISSOES.EDITAR_USUARIO}>
                  <EditarUsuario />
                </RotaPrivada>
              }
            />

            <Route
              path="/visualizarUsuarios"
              element={
                <RotaPrivada permissao={PERMISSOES.VISUALIZAR_USUARIOS}>
                  <VisualizarUsuarios />
                </RotaPrivada>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
