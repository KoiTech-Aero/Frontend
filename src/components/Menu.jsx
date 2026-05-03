import {
  PanelsTopLeft,
  Plus,
  LogOut,
  User,
  MoreHorizontal,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { temPermissao } from "../utils/temPermissao";
import { PERMISSOES } from "../enums/permissoes";

export default function Menu() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [openMore, setOpenMore] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const btn =
    "w-full h-14 flex items-center gap-3 px-4 bg-blue-500 rounded-xl text-white font-semibold text-sm md:text-base leading-none transition duration-300 hover:bg-blue-600 active:scale-[0.98] cursor-pointer";

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:flex bg-slate-900 w-72 p-6 h-screen flex-col justify-between">
        <div className="flex flex-col gap-5">
          {temPermissao(usuario, PERMISSOES.PESQUISAR) && (
            <Link to="/pesquisarNorma">
              <button className={btn}>
                <PanelsTopLeft />
                Normas Ativas
              </button>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.CADASTRAR_NORMA) && (
            <Link to="/cadastrarNorma">
              <button className={btn}>
                <Plus />
                Cadastrar Normas
              </button>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.CADASTRAR_USUARIO) && (
            <Link to="/cadastrarUsuario">
              <button className={btn}>
                <User />
                Cadastrar Usuário
              </button>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.EDITAR_USUARIO) && (
            <Link to="/editarUsuario">
              <button className={btn}>
                <User />
                Editar Usuário
              </button>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.VISUALIZAR_USUARIO) && (
            <Link to="/visualizarUsuario">
              <button className={btn}>
                <User />
                Visualizar Usuário
              </button>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.SOLICITAR) && (
            <Link to="/solicitarNorma">
              <button className={btn}>
                <Plus />
                Solicitar Normas
              </button>
            </Link>
          )}
        </div>

        <div className="bg-slate-800 p-6 rounded-xl text-white">
          <p className="font-bold">{usuario?.nome}</p>
          <p className="text-sm opacity-70">{usuario?.role}</p>

          <button
            onClick={handleLogout}
            className="mt-4 w-full h-12 flex items-center justify-center gap-2 bg-red-500 rounded-xl text-white font-bold transition duration-300 hover:bg-red-600 active:scale-[0.98] cursor-pointer"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-700 flex justify-around items-center h-16 z-50">
        {temPermissao(usuario, PERMISSOES.PESQUISAR) && (
          <Link to="/pesquisarNorma">
            <div
              className={`flex flex-col items-center text-xs ${
                isActive("/pesquisarNorma") ? "text-blue-400" : "text-white"
              }`}
            >
              <PanelsTopLeft size={20} />
              Normas
            </div>
          </Link>
        )}

        {temPermissao(usuario, PERMISSOES.CADASTRAR_NORMA) && (
          <Link to="/cadastrarNorma">
            <div
              className={`flex flex-col items-center text-xs ${
                isActive("/cadastrarNorma") ? "text-blue-400" : "text-white"
              }`}
            >
              <Plus size={20} />
              Normas
            </div>
          </Link>
        )}

        {temPermissao(usuario, PERMISSOES.CADASTRAR_USUARIO) && (
          <Link to="/cadastrarUsuario">
            <div
              className={`flex flex-col items-center text-xs ${
                isActive("/cadastrarUsuario") ? "text-blue-400" : "text-white"
              }`}
            >
              <Plus size={20} />
              Usuários
            </div>
          </Link>
        )}

        <button
          onClick={() => setOpenMore(true)}
          className="flex flex-col items-center text-xs text-white"
        >
          <MoreHorizontal size={20} />
          Mais
        </button>
      </div>

      {/* MODAL */}
      {openMore && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-slate-900 w-full p-6 rounded-t-2xl flex flex-col gap-4">
            {temPermissao(usuario, PERMISSOES.EDITAR_USUARIO) && (
              <Link to="/editarUsuario" onClick={() => setOpenMore(false)}>
                <button className="w-full text-left text-white">
                  Editar Usuário
                </button>
              </Link>
            )}

            {temPermissao(usuario, PERMISSOES.SOLICITAR) && (
              <Link to="/solicitarNorma" onClick={() => setOpenMore(false)}>
                <button className="w-full text-left text-white">
                  Solicitar Normas
                </button>
              </Link>
            )}

            <button onClick={handleLogout} className="text-red-400 text-left">
              Sair
            </button>

            <button
              onClick={() => setOpenMore(false)}
              className="text-center text-gray-400 mt-4"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
