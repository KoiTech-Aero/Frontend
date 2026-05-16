import { Home, MoreHorizontal, User } from "lucide-react";
import { Link } from "react-router";
import { temPermissao } from "../../utils/temPermissao";
import { PERMISSOES } from "../../enums/permissoes";

interface Props {
  usuario: any;
  isActive: (path: string) => boolean;
  onOpenMore: () => void;
}

export default function MobileBottomBar({
  usuario,
  isActive,
  onOpenMore,
}: Props) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-red border-t border-slate-700 flex justify-around items-center h-16 z-50">
      {temPermissao(usuario, PERMISSOES.PESQUISAR) && (
        <Link to="/pesquisarNorma">
          <div className={`flex flex-col items-center text-xs ${isActive("/pesquisarNorma") ? "text-blue-400" : "text-white"}`}>
            <Home size={20} />
            Início
          </div>
        </Link>
      )}

      {temPermissao(usuario, PERMISSOES.EDITAR_USUARIO) && (
        <Link to={`/editarUsuario/${usuario.id}`}>
          <div className={`flex flex-col items-center text-xs ${isActive(`/editarUsuario/${usuario.id}`) ? "text-blue-400" : "text-white"}`}>
            <User size={20} />
            Perfil
          </div>
        </Link>
      )}

      <button onClick={onOpenMore} className="flex flex-col items-center text-xs text-white">
        <MoreHorizontal size={20} />
        Mais
      </button>
    </div>
  );
}