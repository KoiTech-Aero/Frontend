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
    <div className="border-b border-black/10 bg-white transition hover:bg-zinc-50">
      <div className="hidden md:grid md:grid-cols-[2fr_1.2fr_140px_140px_120px] gap-4 items-center px-5 py-4">
        <div className="min-w-0">
          <h1 className="font-semibold truncate">{solicitacao.titulo}</h1>

          <p className="text-xs text-black/50 truncate">
            {solicitacao.codigo_norma}
          </p>
        </div>

        <p className="truncate text-sm text-black/70">{autor}</p>

        <p className="text-sm text-black/60">
          {new Date(solicitacao.data_solicitacao).toLocaleDateString("pt-BR")}
        </p>

        <div>
          <StatusBadge status={solicitacao.status} />
        </div>

        <div className="flex justify-center">
          <button
            onClick={onDetails}
            className="rounded-lg bg-red px-4 py-2 text-sm font-medium text-white transition hover:bg-red-hover cursor-pointer"
          >
            Abrir
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 md:hidden">
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
    </div>
  );
}
