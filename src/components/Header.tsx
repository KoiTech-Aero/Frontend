import { useContext } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { usuario: usuarioLogado } = useContext(AuthContext);
  const location = useLocation();

  let tituloAtual = "Central de Normas";
  let subtituloAtual = "Controle de conformidade e regulamentos técnicos";

  if (location.pathname === "/solicitarNorma") {
    tituloAtual = "Solicitação de Norma";
    subtituloAtual = "Informe os campos para solicitar uma nova norma";
  }

  if (location.pathname.startsWith("/editarUsuario")) {
    tituloAtual = "Meu Perfil";
    subtituloAtual = "Atualize suas informações de usuário";
  }

  if (location.pathname.startsWith("/visualizarSolicitacoesNormas")) {
    tituloAtual = "Visualizar Solicitações";
    subtituloAtual = "Visualize e gerencie as solicitações de normas";
  }

  if (location.pathname === "/cadastrarNorma") {
    tituloAtual = "Cadastro de Norma";
    subtituloAtual = "Informe os campos para cadastrar uma nova norma";
  }

  if (location.pathname.startsWith("/visualizarUsuarios")) {
    tituloAtual = "Visualizar Usuários";
    subtituloAtual = "Visualize e gerencie os usuários cadastrados no sistema";
  }

  if (location.pathname === "/cadastrarUsuario") {
    tituloAtual = "Cadastro de Usuário";
    subtituloAtual = "Informe os campos para cadastrar um novo usuário";
  }

  return (
    <header className="w-full px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-gray-800">{tituloAtual}</h1>

        <p className="text-sm text-gray-500">{subtituloAtual}</p>
      </div>
    </header>
  );
}
