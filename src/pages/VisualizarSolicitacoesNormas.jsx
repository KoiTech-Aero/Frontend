import { useState } from "react";
import { useNavigate } from "react-router";

export default function VisualizarSolicitacoesNormas() {
  const navigate = useNavigate();

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState({});
  const [usuarios, setUsuarios] = useState({});
  const [modal, setModal] = useState(false);

  return (
    <div className="w-full flex justify-center">
      <div className="overflow-y-auto w-full max-w-3xl flex flex-col rounded-2xl bg-amber-50">
        {/* HEADER */}
        <div className="m-5 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold">
            Solicitações de Normas
          </h1>
          <h2 className="text-md text-gray-500">
            Gerencie as solicitações do sistema.
          </h2>
        </div>

        <hr className="border-2 border-gray-300" />

        {/* LISTA */}
        <div className="m-5 md:m-10 flex flex-col gap-4">
          {solicitacoes.map((solicitacao) => (
            <div
              key={solicitacao.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-4 rounded-md border-gray-300 bg-gray-100"
            >
              {/* INFO */}
              <div className="flex flex-col">
                <p className="font-bold text-lg">{solicitacao.titulo}</p>
                <p className="text-sm text-gray-600 break-all">
                  <strong>Autor: </strong>
                  {usuarios[solicitacao.usuario.id] || "Carregando..."}
                </p>
              </div>

              {/* DATA */}
              <div className="text-xs text-gray-400 md:text-sm md:text-right">
                Criada em:{" "}
                {solicitacao.data_solicitacao
                  ? new Date(solicitacao.data_solicitacao).toLocaleDateString()
                  : "Sem Data"}
              </div>

              {/* STATUS */}
              <div className="w-full md:w-auto">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    solicitacaoSelecionada.status === "Pendente"
                      ? "bg-yellow-100 text-yellow-700"
                      : solicitacaoSelecionada.status === "Aprovada"
                        ? "bg-green-100 text-green-700"
                        : solicitacaoSelecionada.status === "Rejeitada"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                  }
                `}
                >
                  {solicitacaoSelecionada.status}
                </span>
              </div>

              {/* BOTÃO */}
              <div className="w-full md:w-auto">
                <button
                  onClick={() => {
                    setModal(true);
                    setSolicitacaoSelecionada(solicitacao);
                  }}
                  className="w-full md:w-auto bg-blue-600 text-white font-bold rounded-md px-4 py-2 cursor-pointer"
                >
                  Detalhes
                </button>
              </div>

              {/* MODAL */}
              {modal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4 z-50">
                  <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
                    {/* HEADER */}
                    <div className="bg-white text-2xl md:text-3xl font-bold px-6 py-4 flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-bold">
                          {solicitacaoSelecionada.titulo}
                        </h2>

                        <p className="text-sm text-gray-600 mt-1">
                          Código: {solicitacaoSelecionada.codigo_norma}
                        </p>
                      </div>

                      <button
                        onClick={() => setModal(false)}
                        className="hover:bg-white/20 rounded-md p-2 transition"
                      >
                        ✕
                      </button>
                    </div>

                    <hr className="border-2 border-gray-300" />

                    {/* BODY */}
                    <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                      {/* STATUS */}
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Status:</span>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium
                          ${
                            solicitacaoSelecionada.status === "Pendente"
                              ? "bg-yellow-100 text-yellow-700"
                              : solicitacaoSelecionada.status === "Aprovada"
                                ? "bg-green-100 text-green-700"
                                : solicitacaoSelecionada.status === "Rejeitada"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700"
                          }
                        `}
                        >
                          {solicitacaoSelecionada.status}
                        </span>
                      </div>

                      {/* INFORMAÇÕES */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500">Autor</p>
                          <p className="font-semibold">
                            {usuarios[solicitacaoSelecionada.usuario.id] ||
                              "Carregando..."}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500">
                            Data da Solicitação
                          </p>

                          <p className="font-semibold">
                            {new Date(
                              solicitacaoSelecionada.data_solicitacao,
                            ).toLocaleDateString("pt-BR")}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500">Versão</p>
                          <p className="font-semibold">
                            {solicitacaoSelecionada.versao_norma}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500">Órgão Emissor</p>

                          <p className="font-semibold">
                            {solicitacaoSelecionada.orgao_emissor}
                          </p>
                        </div>
                      </div>

                      {/* MOTIVO */}
                      <div>
                        <p className="font-semibold mb-2">
                          Motivo da Solicitação
                        </p>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 leading-relaxed">
                          {solicitacaoSelecionada.motivo}
                        </div>
                      </div>

                      {/* AÇÕES */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold">
                          Aprovar
                        </button>

                        <button className="flex-1 bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-xl font-semibold">
                          Rejeitar
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={() => navigate("/cadastrarNorma", {state: {solicitacaoSelecionada }})}
                          className="flex-1 bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold"
                        >
                          Cadastrar Norma
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
