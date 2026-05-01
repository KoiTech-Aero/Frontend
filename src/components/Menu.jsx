import { PanelsTopLeft, Plus, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { temPermissao } from "../utils/temPermissao";
import { PERMISSOES } from "../enums/permissoes";

export default function Menu() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const btn =
    "w-full flex items-center gap-2 cursor-pointer bg-blue-500 p-6 rounded-xl text-white font-bold transition duration-300 hover:bg-blue-600";

  const btnLogout =
    "w-fit h-10 mt-5 flex items-center gap-2 cursor-pointer bg-red-500 p-4 rounded-xl text-white font-bold transition duration-300 hover:bg-red-600";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="bg-slate-900 w-75 p-6 h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        {/* PESQUISAR */}
        {temPermissao(usuario, PERMISSOES.PESQUISAR) && (
          <Link to="/pesquisarNorma">
            <button className={btn}>
              <PanelsTopLeft />
              Normas Ativas
            </button>
          </Link>
        )}

        {/* CADASTRAR NORMA */}
        {temPermissao(usuario, PERMISSOES.CADASTRAR_NORMA) && (
          <Link to="/cadastrarNorma">
            <button className={btn}>
              <Plus />
              Cadastrar Normas
            </button>
          </Link>
        )}

        {/* CADASTRAR USUÁRIO */}
        {temPermissao(usuario, PERMISSOES.PESQUISAR) && (
          <Link to="/cadastrarUsuario">
            <button className={btn}>
              <PanelsTopLeft />
              Cadastrar Usuário
            </button>
          </Link>
        )}

        {/* SOLICITAR */}
        {temPermissao(usuario, PERMISSOES.SOLICITAR) && (
          <Link to="/solicitarNorma">
            <button className={btn}>
              <Plus />
              Solicitar Normas
            </button>
          </Link>
        )}
      </div>

      {/* INFO USUÁRIO */}
      <div className="bg-slate-800 p-6 rounded-xl text-white">
        <p className="font-bold">{usuario?.nome}</p>
        <p className="text-sm opacity-70">{usuario?.role}</p>

        <button onClick={handleLogout} className={btnLogout}>
          <LogOut />
          Sair
        </button>
      </div>
    </div>
  );
}
