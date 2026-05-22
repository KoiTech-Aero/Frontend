import type { listarUsuario } from "../../types/listarUsuarios";

import UsuarioStatusBadge from "./usuarioStatusBadge";

import UsuarioAvatar from "./usuarioAvatar";

interface UsuarioRowProps {
  usuario: listarUsuario;

  onEdit: () => void;
}

export default function UsuarioRow({ usuario, onEdit }: UsuarioRowProps) {
  return (
    <div className="border-b border-black/10 bg-white transition hover:bg-zinc-50">
      <div className="hidden md:grid md:grid-cols-[90px_1.5fr_1.7fr_140px_140px_120px] gap-4 items-center px-5 py-4">
        <UsuarioAvatar role={usuario.role} />

        <div className="min-w-0">
          <h1 className="truncate font-semibold">{usuario.nome}</h1>

          <p className="truncate text-xs text-black/50">{usuario.email}</p>
        </div>

        <div className="flex items-center min-w-0">
          <p className="truncate text-sm text-black/70">{usuario.email}</p>
        </div>

        <div className="flex items-center">
          <p className="text-sm font-medium text-blue-600">{usuario.role}</p>
        </div>

        <div className="flex items-center">
          <UsuarioStatusBadge status={usuario.status} />
        </div>

        <div className="flex justify-center">
          <button
            onClick={onEdit}
            className="rounded-lg bg-red px-4 py-2 text-sm font-medium text-white transition hover:bg-red-hover cursor-pointer"
          >
            Editar
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 md:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="wrap-break-words text-sm font-semibold">
              {usuario.nome}
            </h1>

            <p className="mt-1 break-all text-xs text-black/50">
              {usuario.email}
            </p>
          </div>

          <UsuarioStatusBadge status={usuario.status} />
        </div>

        <div className="flex flex-col gap-1 text-sm text-black/60">
          <p>
            <span className="font-medium">Perfil:</span> {usuario.role}
          </p>

          <p>
            <span className="font-medium">Criado em:</span>{" "}
            {new Date(usuario.data_cadastro).toLocaleDateString("pt-BR")}
          </p>
        </div>

        <button
          onClick={onEdit}
          className="w-full rounded-xl bg-red py-3 text-sm font-semibold text-white transition hover:bg-red-hover cursor-pointer"
        >
          Editar Usuário
        </button>
      </div>
    </div>
  );
}
