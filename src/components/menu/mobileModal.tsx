import { X, ClipboardPlus, UserPlus, FilePlus2, Users, LogOut } from "lucide-react";
import { Link } from "react-router";
import { PERMISSOES } from "../../enums/permissoes";
import { temPermissao } from "../../utils/temPermissao";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  usuario: any;
  onLogout: () => void;
}

export default function MobileModal({
  open,
  setOpen,
  usuario,
  onLogout,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
      <div className="bg-red-dark w-full rounded-t-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-bold">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X className="text-slate-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {temPermissao(usuario, PERMISSOES.SOLICITAR) && (
            <Link to="/solicitarNorma" onClick={() => setOpen(false)}>
              <div className="bg-red rounded-2xl p-4 flex flex-col items-center text-white gap-2">
                <ClipboardPlus size={22} />
                Solicitar Norma
              </div>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.CADASTRAR_USUARIO) && (
            <Link to="/cadastrarUsuario" onClick={() => setOpen(false)}>
              <div className="bg-red rounded-2xl p-4 flex flex-col items-center text-white gap-2">
                <UserPlus size={22} />
                Cadastrar Usuário
              </div>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.CADASTRAR_NORMA) && (
            <Link to="/cadastrarNorma" onClick={() => setOpen(false)}>
              <div className="bg-red rounded-2xl p-4 flex flex-col items-center text-white gap-2">
                <FilePlus2 size={22} />
                Cadastrar Norma
              </div>
            </Link>
          )}

          {temPermissao(usuario, PERMISSOES.VISUALIZAR_USUARIOS) && (
            <Link to="/visualizarUsuarios" onClick={() => setOpen(false)}>
              <div className="bg-red rounded-2xl p-4 flex flex-col items-center text-white gap-2">
                <Users size={22} />
                Usuários
              </div>
            </Link>
          )}
        </div>

        <button
          onClick={onLogout}
          className="mt-6 w-full bg-red text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </div>
  );
}