import { BrowserRouter, Route, Routes } from "react-router";
import { PERMISSOES } from "./enums/permissoes";
import AuthLayout from "./layouts/LayoutAuth";
import LayoutSistema from "./layouts/LayoutSistema";
import CadastrarNorma from "./pages/CadastrarNorma";
import CadastrarUsuario from "./pages/CadastrarUsuario";
import CadastrarVersao from "./pages/CadastrarVersao";
import CadastrarTag from "./pages/CadastrarTag";
import EditarUsuario from "./pages/EditarUsuario";
import Login from "./pages/Login";
import PesquisarNorma from "./pages/PesquisarNorma";
import SolicitarNorma from "./pages/SolicitarNorma";
import SolicitarNota from "./pages/SolicitarNota";
import VisualizarNorma from "./pages/VisualizarNorma";
import VisualizarSolicitacoes from "./pages/VisualizarSolicitacoes";
import VisualizarUsuarios from "./pages/VisualizarUsuarios";
import VisualizarVersao from "./pages/VisualizarVersao";
import VisualizarNotas from "./pages/VisualizarNotas";
import { AuthProvider } from "./providers/AuthProvider";
import RotaPrivada from "./routes/RotaPrivada";


export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Públicas */}
				<Route element={<AuthLayout />}>
					<Route path="/" element={<Login />} />
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
              path="/cadastrarTag"
              element={
                <RotaPrivada permissao={PERMISSOES.CADASTRAR_TAG}>
                  <CadastrarTag />
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
              path="/solicitarNota"
              element={
                <RotaPrivada permissao={PERMISSOES.SOLICITAR_NOTA}>
                  <SolicitarNota />
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

            <Route
              path="/visualizarSolicitacoes"
              element={
                <RotaPrivada permissao={PERMISSOES.VISUALIZAR_SOLICITACOES}>
                  <VisualizarSolicitacoes />
                </RotaPrivada>
              }
            />

            <Route
              path="/visualizarNotas"
              element={
                <RotaPrivada permissao={PERMISSOES.VISUALIZAR_NOTAS}>
                  <VisualizarNotas />
                </RotaPrivada>
              }
            />
            

          </Route>
        </Routes>
      </BrowserRouter>
  );
}
