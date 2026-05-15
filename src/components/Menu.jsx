import {
  PanelsTopLeft,
  LogOut,
  User,
  MoreHorizontal,
  Menu as MenuIcon,
  X,
  FileText,
  FilePlus2,
  UserPlus,
  Send,
  ClipboardPlus,
  ClipboardList,
  UserPlus2,
  Users,
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
  const [collapsed, setCollapsed] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const isActive = (path) => location.pathname === path;

  const menuItem =
    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium";

  const activeItem = "bg-blue-500 text-white";
  const inactiveItem = "text-slate-300 hover:bg-slate-800 hover:text-white";

  return (
    <>
      {/* LAYOUT ALTERNATIVO PARA BARRA DE SCROLL */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 999px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #475569;
          }

          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #334155 transparent;
          }
        `}
      </style>

      {/* DESKTOP */}
      <aside
        className={`hidden md:flex h-screen bg-slate-900 border-r border-slate-800 flex-col transition-all duration-300 ${
          collapsed ? "w-20" : "w-90"
        }`}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-white font-bold text-lg">AeroNormas</h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-10 h-10 flex items-center text-slate-300 hover:text-white transition cursor-pointer ${
              collapsed ? "justify-center" : "justify-end"
            }`}
          >
            {collapsed ? <MenuIcon /> : <X />}
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 flex flex-col gap-2">
          {temPermissao(usuario, PERMISSOES.PESQUISAR) && (
            <Link to="/pesquisarNorma">
              <button
                title="Normas Ativas"
                className={`${menuItem} ${
                  isActive("/pesquisarNorma") ? activeItem : inactiveItem
                } ${collapsed ? "justify-center px-0" : ""}`}
              >
                <PanelsTopLeft size={20} />

                {!collapsed && <span>Normas</span>}
              </button>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.CADASTRAR_NORMA) && (
            <Link to="/cadastrarNorma">
              <button
                title="Cadastrar Normas"
                className={`${menuItem} ${
                  isActive("/cadastrarNorma") ? activeItem : inactiveItem
                } ${collapsed ? "justify-center px-0" : ""}`}
              >
                <FilePlus2 size={20} />

                {!collapsed && <span>Cadastrar Normas</span>}
              </button>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.CADASTRAR_USUARIO) && (
            <Link to="/cadastrarUsuario">
              <button
                title="Cadastrar Usuário"
                className={`${menuItem} ${
                  isActive("/cadastrarUsuario") ? activeItem : inactiveItem
                } ${collapsed ? "justify-center px-0" : ""}`}
              >
                <UserPlus size={20} />

                {!collapsed && <span>Cadastrar Usuário</span>}
              </button>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.VISUALIZAR_USUARIOS) && (
            <Link to="/visualizarUsuarios">
              <button
                title="Visualizar Usuários"
                className={`${menuItem} ${
                  isActive("/visualizarUsuarios") ? activeItem : inactiveItem
                } ${collapsed ? "justify-center px-0" : ""}`}
              >
                <Users size={20} />

                {!collapsed && <span>Usuários</span>}
              </button>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.SOLICITAR) && (
            <Link to="/solicitarNorma">
              <button
                title="Solicitar Normas"
                className={`${menuItem} ${
                  isActive("/solicitarNorma") ? activeItem : inactiveItem
                } ${collapsed ? "justify-center px-0" : ""}`}
              >
                <ClipboardPlus size={20} />

                {!collapsed && <span>Solicitar Norma</span>}
              </button>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.EDITAR_USUARIO) && (
            <Link to={`/editarUsuario/${usuario.id}`}>
              <button
                title="Meu Perfil"
                className={`${menuItem} ${
                  isActive(`/editarUsuario/${usuario.id}`)
                    ? activeItem
                    : inactiveItem
                } ${collapsed ? "justify-center px-0" : ""}`}
              >
                <User size={20} />

                {!collapsed && <span>Meu Perfil</span>}
              </button>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.VISUALIZAR_SOLICITACOES_NORMAS) && (
            <Link to="/visualizarSolicitacoesNormas">
              <button
                title="Solicitações de Normas"
                className={`${menuItem} ${
                  isActive("/visualizarSolicitacoesNormas")
                    ? activeItem
                    : inactiveItem
                } ${collapsed ? "justify-center px-0" : ""}`}
              >
                <ClipboardList size={20} />

                {!collapsed && <span>Solicitações de Normas</span>}
              </button>
            </Link>
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t border-slate-800 p-3">
          <div className="bg-slate-800 rounded-xl p-3">
            {!collapsed && (
              <>
                <p className="text-white font-semibold">{usuario?.nome}</p>

                <p className="text-slate-400 text-sm">{usuario?.role}</p>
              </>
            )}

            <button
              onClick={handleLogout}
              title="Sair"
              className={`mt-4 bg-red-500 hover:bg-red-600 transition-all text-white rounded-lg cursor-pointer flex items-center justify-center gap-2 ${
                collapsed ? "w-full h-12 px-0" : "w-full py-3"
              }`}
            >
              <LogOut size={18} />

              {!collapsed && <span>Sair</span>}
            </button>
          </div>
        </div>
      </aside>

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

        {temPermissao(usuario, PERMISSOES.EDITAR_USUARIO) && (
          <Link to={`/editarUsuario/${usuario.id}`}>
            <div
              className={`flex flex-col items-center text-xs ${
                isActive(`/editarUsuario/${usuario.id}`)
                  ? "text-blue-400"
                  : "text-white"
              }`}
            >
              <User size={20} />
              Meu Perfil
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

      {/* MOBILE MODAL */}
      {openMore && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
          <div className="bg-slate-900 w-full rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-bold">Menu</h2>

              <button
                onClick={() => setOpenMore(false)}
                className="text-slate-400"
              >
                <X />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {temPermissao(usuario, PERMISSOES.CADASTRAR_USUARIO) && (
                <Link to="/cadastrarUsuario" onClick={() => setOpenMore(false)}>
                  <div className="bg-slate-800 rounded-2xl p-4 flex flex-col items-center gap-2 text-white">
                    <UserPlus2 />

                    <span className="text-sm text-center">
                      Cadastrar Usuário
                    </span>
                  </div>
                </Link>
              )}

              {temPermissao(usuario, PERMISSOES.VISUALIZAR_USUARIOS) && (
                <Link
                  to="/visualizarUsuarios"
                  onClick={() => setOpenMore(false)}
                >
                  <div className="bg-slate-800 rounded-2xl p-4 flex flex-col items-center gap-2 text-white">
                    <Users />

                    <span className="text-sm text-center">
                      Visualizar Usuários
                    </span>
                  </div>
                </Link>
              )}

              {temPermissao(usuario, PERMISSOES.SOLICITAR) && (
                <Link to="/solicitarNorma" onClick={() => setOpenMore(false)}>
                  <div className="bg-slate-800 rounded-2xl p-4 flex flex-col items-center gap-2 text-white">
                    <ClipboardPlus />

                    <span className="text-sm text-center">
                      Solicitar Normas
                    </span>
                  </div>
                </Link>
              )}

              {temPermissao(usuario, PERMISSOES.CADASTRAR_NORMA) && (
                <Link to="/cadastrarNorma" onClick={() => setOpenMore(false)}>
                  <div className="bg-slate-800 rounded-2xl p-4 flex flex-col items-center gap-2 text-white">
                    <FilePlus2 />

                    <span className="text-sm text-center">Cadastrar Norma</span>
                  </div>
                </Link>
              )}

              {temPermissao(
                usuario,
                PERMISSOES.VISUALIZAR_SOLICITACOES_NORMAS,
              ) && (
                <Link
                  to="/visualizarSolicitacoesNormas"
                  onClick={() => setOpenMore(false)}
                >
                  <div className="bg-slate-800 rounded-2xl p-4 flex flex-col items-center gap-2 text-white">
                    <FileText />

                    <span className="text-sm text-center">
                      Solicitações de Normas
                    </span>
                  </div>
                </Link>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 transition rounded-xl py-3 text-white font-semibold flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
      )}
    </>
  );
}
