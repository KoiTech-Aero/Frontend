import type { SolicitacaoNorma } from "../../types/solicitacaoNorma";

import StatusBadge from "./statusBadge";

interface SolicitacaoRowProps {
  solicitacao: SolicitacaoNorma;

  autor: string;

  onDetails: () => void;
}

export default function SolicitacaoRow({
  solicitacao,
  autor,
  onDetails,
}: SolicitacaoRowProps) {
  return (
    <>
      {/* DESKTOP */}
      <tr className="hidden md:table-row border-b border-black/10 bg-white transition hover:bg-zinc-50">
        <td className="px-6 py-4 align-middle">
          <div className="min-w-0">
            <h1 className="font-semibold truncate">{solicitacao.titulo}</h1>

            <p className="text-xs text-black/50 truncate">
              {solicitacao.codigo_norma}
            </p>
          </div>
        </td>

        <td className="px-6 py-4 align-middle">
          <p className="truncate text-sm text-black/70">{autor}</p>
        </td>

        <td className="px-6 py-4 align-middle">
          <p className="text-sm text-black/60">
            {new Date(solicitacao.data_solicitacao).toLocaleDateString("pt-BR")}
          </p>
        </td>

        <td className="px-6 py-4 align-middle">
          <StatusBadge status={solicitacao.status} />
        </td>

        <td className="px-6 py-4 align-middle text-center">
          <button
            onClick={onDetails}
            className="rounded-lg bg-red px-4 py-2 text-sm font-medium text-white transition hover:bg-red-hover cursor-pointer"
          >
            Abrir
          </button>
        </td>
      </tr>

      {/* MOBILE */}
      <div className="flex flex-col gap-4 border-b border-black/10 bg-white p-4 transition hover:bg-zinc-50 md:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-semibold text-sm wrap-break-words">
              {solicitacao.titulo}
            </h1>

            <p className="mt-1 text-xs text-black/50 break-all">
              {solicitacao.codigo_norma}
            </p>
          </div>

          <StatusBadge status={solicitacao.status} />
        </div>

        <div className="flex flex-col gap-1 text-sm text-black/60">
          <p>
            <span className="font-medium">Autor:</span> {autor}
          </p>

          <p>
            <span className="font-medium">Data:</span>{" "}
            {new Date(solicitacao.data_solicitacao).toLocaleDateString("pt-BR")}
          </p>
        </div>

        <button
          onClick={onDetails}
          className="w-full rounded-xl bg-red py-3 text-sm font-semibold text-white transition hover:bg-red-hover cursor-pointer"
        >
          Visualizar Solicitação
        </button>
      </div>
    </>
  );
}
