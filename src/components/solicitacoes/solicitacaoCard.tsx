import type { SolicitacaoNorma } from "../../types/solicitacaoNorma";

import StatusBadge from "./statusBadge";

interface SolicitacaoCardProps {
  solicitacao: SolicitacaoNorma;

  autor: string;

  onDetails: () => void;
}

export default function SolicitacaoCard({
  solicitacao,
  autor,
  onDetails,
}: SolicitacaoCardProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-4 rounded-md border-gray-300 bg-gray-100">
      <div className="flex flex-col">
        <p className="font-bold text-lg">{solicitacao.titulo}</p>

        <p className="text-sm text-gray-600 break-all">
          <strong>Autor: </strong>

          {autor}
        </p>
      </div>

      <div className="text-xs text-gray-400 md:text-sm md:text-right">
        Criada em:{" "}
        {new Date(solicitacao.data_solicitacao).toLocaleDateString("pt-BR")}
      </div>

      <div>
        <StatusBadge status={solicitacao.status} />
      </div>

      <button
        onClick={onDetails}
        className="bg-blue-600 text-white font-bold rounded-md px-4 py-2 cursor-pointer"
      >
        Detalhes
      </button>
    </div>
  );
}
